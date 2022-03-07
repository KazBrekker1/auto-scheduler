import { defineStore, acceptHMRUpdate } from "pinia";
import { doc, setDoc, arrayUnion, query, collection, getDocs, where, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useToast } from 'vue-toastification'

const toast = useToast()
const times = {
    "08:00": [],
    "09:00": [],
    "10:00": [],
    "11:00": [],
    "12:00": [],
    "13:00": [],
    "14:00": [],
    "15:00": [],
    "16:00": [],
    "17:00": [],
    "18:00": [],
    "19:00": [],
    "20:00": [],
    "21:00": [],
    "22:00": [],
}
export const useSchedsStore = defineStore("scheds", {
    state: () => {
        return {
            loadedSched: {
                Saturday: JSON.parse(JSON.stringify(times))
                , Sunday: JSON.parse(JSON.stringify(times))
                , Monday: JSON.parse(JSON.stringify(times))
                , Tuesday: JSON.parse(JSON.stringify(times))
                , Wednesday: JSON.parse(JSON.stringify(times))
                , Thursday: JSON.parse(JSON.stringify(times))
            },
            submissionsCount: 0
        }
    },
    actions: {
        async submitTimes(times, userEmail, userName) {
            let schedCode = prompt(
                'Enter The Code',
                new Date().toLocaleDateString().replaceAll('/', '-')
            )
            let timeIdx
            let userSubmited = false
            let schedRef = doc(db, "sessions", schedCode.replaceAll(" ", ""))
            const schedTimes = await getDoc(schedRef)
            if (schedTimes.exists()) {
                schedTimes.data()['times'].forEach((userSubmission, idx) => {
                    if (userSubmission.userEmail == userEmail) {
                        timeIdx = idx
                        userSubmited = true
                        return
                    }
                });
            }
            if (!userSubmited) {
                await setDoc(schedRef, {
                    times: arrayUnion({ userEmail, userName, ...times })
                }, { merge: true });
                toast.success("Schedule Uploaded")
            } else {
                toast.warning("You Already Uploaded Your Schedule")
            }
        }, downloadSchedule(items) {
            let filename = "my_sched.json";
            let contentType = "application/json;charset=utf-8;";
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(items, null, 4)))], { type: contentType });
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                var a = document.createElement('a');
                a.download = filename;
                a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(items, null, 4));
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }, async loadSched(schedCode) {
            const schedTimes = await getDoc(doc(db, "sessions", schedCode))
            this.loadedSched = {
                Saturday: JSON.parse(JSON.stringify(times))
                , Sunday: JSON.parse(JSON.stringify(times))
                , Monday: JSON.parse(JSON.stringify(times))
                , Tuesday: JSON.parse(JSON.stringify(times))
                , Wednesday: JSON.parse(JSON.stringify(times))
                , Thursday: JSON.parse(JSON.stringify(times))
            }
            if (schedTimes.exists()) {
                let schedObject = schedTimes.data()
                this.submissionsCount = schedObject['times'].length
                schedObject['times'].forEach(userSubmission => {
                    for (const weekday in userSubmission) {
                        if (!["userName", "userEmail"].includes(weekday)) {
                            for (const time of userSubmission[weekday]) {
                                this.loadedSched[weekday][time].push(userSubmission['userName'])
                            }
                        }
                    }
                });
            } else {
                toast.error("A Schedule With This Code Doesnt Exist")
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSchedsStore, import.meta.hot))
}