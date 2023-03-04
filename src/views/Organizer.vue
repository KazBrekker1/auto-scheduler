<template>
    <div class="w-3/5 flex flex-wrap place-content-center justify-around mx-auto">
        <div class="p-10 card bg-base-200 mx-auto">
            <h1 class="font-bold text-center">The Current User</h1>
            <div class="card bg-neutral p-4 my-2">
                <h1 class="text-center">{{ user.displayName }}</h1>
                <h2 class="text-center">{{ user.email }}</h2>
            </div>
        </div>
        <div class="form-control my-auto mx-auto">
            <div class="input-group py-4 place-content-center">
                <input type="text" placeholder="Session Code" class="input input-md input-bordered"
                    v-model.trim="schedCode" />
                <button @click="lookUpSchedule" class="btn btn-md btn-info">Look Up Schedule</button>
            </div>
            <div class="mx-auto text-center">
                <button @click="generateSchedCode" class="btn btn-success mb-2">Generate Schedule Code</button>
                <h2 ref="codeTxt"></h2>
            </div>
        </div>
    </div>
    <table class="table table-normal w-3/4 mx-auto my-4 table-zebra">
        <thead>
            <tr class="text-center sticky z-20 top-5">
                <th style="z-index: 0; position: static;">Saturday</th>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="time in times" :key="time">
                <td class="text-center">
                    <div class="dropdown dropdown-right dropdown-end">
                        <label tabindex="0" class="btn m-1 text-lg">
                            {{ time }}
                            <div class="badge">{{ loadedSched['Saturday'][time].length }} / {{ submissionCount }}</div>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li v-for="person, idx in loadedSched['Saturday'][time]" :key="idx">
                                <a>{{ person }}</a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="text-center">
                    <div class="dropdown dropdown-right dropdown-end">
                        <label tabindex="0" class="btn m-1 text-lg">
                            {{ time }}
                            <div class="badge">{{ loadedSched['Sunday'][time].length }} / {{ submissionCount }}</div>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li v-for="person, idx in loadedSched['Sunday'][time]" :key="idx">
                                <a>{{ person }}</a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="text-center">
                    <div class="dropdown dropdown-right dropdown-end">
                        <label tabindex="0" class="btn m-1 text-lg">
                            {{ time }}
                            <div class="badge">{{ loadedSched['Monday'][time].length }} / {{ submissionCount }}</div>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li v-for="person, idx in loadedSched['Monday'][time]" :key="idx">
                                <a>{{ person }}</a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="text-center">
                    <div class="dropdown dropdown-right dropdown-end">
                        <label tabindex="0" class="btn m-1 text-lg">
                            {{ time }}
                            <div class="badge">{{ loadedSched['Tuesday'][time].length }} / {{ submissionCount }}</div>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li v-for="person, idx in loadedSched['Tuesday'][time]" :key="idx">
                                <a>{{ person }}</a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="text-center">
                    <div class="dropdown dropdown-right dropdown-end">
                        <label tabindex="0" class="btn m-1 text-lg">
                            {{ time }}
                            <div class="badge">{{ loadedSched['Wednesday'][time].length }} / {{ submissionCount }}</div>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li v-for="person, idx in loadedSched['Wednesday'][time]" :key="idx">
                                <a>{{ person }}</a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="text-center">
                    <div class="dropdown dropdown-right dropdown-end">
                        <label tabindex="0" class="btn m-1 text-lg">
                            {{ time }}
                            <div class="badge">{{ loadedSched['Thursday'][time].length }} / {{ submissionCount }}</div>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li v-for="person, idx in loadedSched['Thursday'][time]" :key="idx">
                                <a>{{ person }}</a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="py-3 px-9">
        <button @click="schedStore.downloadSchedule(loadedSched, 'For_All')"
            class="btn btn-info btn-lg left-6 bottom-6 sm:fixed">Download</button>
    </div>
</template>

<script setup>
import { v4 as uuid4 } from "uuid"
import { ref } from "@vue/reactivity";
import { useAuthStore } from "../stores/auth";
import { useToast } from "vue-toastification"
import { useSchedsStore } from "../stores/sched";
import { computed } from "@vue/runtime-core";


const authStore = useAuthStore()
const schedStore = useSchedsStore()
const toast = useToast()
let times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
]
let schedCode = ref("")
let codeTxt = ref(null)

let user = computed(() => authStore.loggedInUser)
let loadedSched = computed(() => schedStore.loadedSched)
let submissionCount = computed(() => schedStore.submissionsCount)

const lookUpSchedule = () => {
    schedStore.loadSched(schedCode.value)
}
const generateSchedCode = () => {
    let schedUUID = uuid4().replaceAll("-", "")
    navigator.clipboard.writeText(schedUUID).then(() => {
        toast.success("Copied To Clipboard!")
        codeTxt.value.innerText = schedUUID
    })

}

</script>
