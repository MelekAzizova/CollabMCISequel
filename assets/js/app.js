const formF2 = document.getElementById('form2');

formF2.addEventListener('submit', function (event) {
    event.preventDefault();
    location.href = "all.html?search=" + formF2.search.value;
});
