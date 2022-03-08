<template>
    <div class="p-4">
        <table class="table w-3/4 mx-auto table-zebra">
            <thead>
                <tr class="text-center">
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
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label justify-evenly">
                                <input
                                    @click="(evt) => {
                                        handleTimeToggle(time, 'Saturday', evt)
                                    }"
                                    type="checkbox"
                                    class="checkbox mx-2"
                                />
                                <span class="label-text">{{ time }}</span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label justify-evenly">
                                <input
                                    @click="(evt) => {
                                        handleTimeToggle(time, 'Sunday', evt)
                                    }"
                                    type="checkbox"
                                    class="checkbox mx-2"
                                />
                                <span class="label-text">{{ time }}</span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label justify-evenly">
                                <input
                                    @click="(evt) => {
                                        handleTimeToggle(time, 'Monday', evt)
                                    }"
                                    type="checkbox"
                                    class="checkbox mx-2"
                                />
                                <span class="label-text">{{ time }}</span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label justify-evenly">
                                <input
                                    @click="(evt) => {
                                        handleTimeToggle(time, 'Tuesday', evt)
                                    }"
                                    type="checkbox"
                                    class="checkbox mx-2"
                                />
                                <span class="label-text">{{ time }}</span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label justify-evenly">
                                <input
                                    @click="(evt) => {
                                        handleTimeToggle(time, 'Wednesday', evt)
                                    }"
                                    type="checkbox"
                                    class="checkbox mx-2"
                                />
                                <span class="label-text">{{ time }}</span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label justify-evenly">
                                <input
                                    @click="(evt) => {
                                        handleTimeToggle(time, 'Thursday', evt)
                                    }"
                                    type="checkbox"
                                    class="checkbox mx-2"
                                />
                                <span class="label-text">{{ time }}</span>
                            </label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="py-3 px-9 gap-3 btn-group">
        <button
            @click="schedStore.submitTimes(resultObject, user.email, user.displayName)"
            class="btn btn-success btn-lg right-6 bottom-6 sm:fixed"
        >Submit</button>

        <button
            @click="schedStore.downloadSchedule(resultObject, 'My_Sched')"
            class="btn btn-info btn-lg left-6 bottom-6 sm:fixed"
        >Download</button>
    </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useSchedsStore } from "../stores/sched";

const authStore = useAuthStore()
const schedStore = useSchedsStore()
let user = authStore.loggedInUser
// Remove user.name and user.email from submit function
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

let resultObject = { Saturday: [], Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [] }
const handleTimeToggle = (time, day, evt) => {
    if (evt.target.checked) {
        resultObject[day].push(time)
    } else {
        let idx = resultObject[day].indexOf(time)
        resultObject[day].splice(idx, 1)
    }
}
</script>

<style>
</style>
