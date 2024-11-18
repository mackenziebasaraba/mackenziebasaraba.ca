const currentDate = new Date();
const footer = document.getElementById("copyright");

year = new Date.getFullYear();
console.log(year);
if (footer) {
    footer.innerHTML = "&copy; Peter MacKenzie-Basaraba, " + year;
} else {
    console.error("Couldn't find footer copyright.")
}
