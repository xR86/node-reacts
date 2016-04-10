import $ from 'jquery';

import appConfig from '../configs/appConfig';

export let getAllExams = () => {
    return $.ajax({
        type: 'GET',
        url: `${appConfig.serverUrl}exams`,
        cache: false
    });
}

export let getUsersFromExam = (examId) => {
    return $.ajax({
        type: 'GET',
        url: `${appConfig.serverUrl}users?exams=${examId}`,
        cache: false
    });
}
