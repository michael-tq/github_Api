'use strict';

$(function() {
    watchForm();
  });

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let user = $('#user').val();
        getUserData(user);
    });
};

function getUserData(user) {
    let url = 'https://api.github.com/users/'

    fetch(url + user + '/repos')
    .then(function(response) {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => 
        displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
} 

function displayResults(responseJson) {
    let repositories = [];
    let urls = [];
    for (let i = 0; i < responseJson.length; i++){
        repositories.push(`<p>${responseJson[i].name} <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></p>`);
    }
    let repos = repositories.join('');
    $('.name-result').html(repos);
}