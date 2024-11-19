document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".js").forEach(e => e.classList.remove("js"));

    const search = document.getElementById("search");
    const clearSearch = document.getElementById("clearsearch");
    const dateHeading = document.getElementById("dateheading");
    const postList = document.getElementById("postlist");
    const posts = Array.from(document.querySelectorAll("#postlist li"));

    const postsData = posts.map(post => ({
        element: post,
        content: `${post.textContent} ${post.dataset.tags}`
            .toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    }));

    const updateView = (searchText) => {
        const searchTerms = searchText.split(" ");
        const hasFilter = searchText.length > 0;

        postList.classList.toggle("searched", hasFilter);
        dateHeading.classList.toggle("hidden", hasFilter);

        postsData.forEach(({ element, content }) => {
            const isMatch = searchTerms.every(term => content.includes(term));
            element.hidden = !isMatch;
            element.classList.toggle("matched-search", hasFilter && isMatch);
        });
    };

    search.addEventListener("input", () => {
        const searchText = search.value
            .toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        updateView(searchText);
    });

    clearSearch.addEventListener("click", () => {
        search.value = "";
        updateView("");
    });
});
