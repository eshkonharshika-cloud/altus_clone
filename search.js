// 1️⃣ Algolia client
const client = algoliasearch(
  "JEPZYHP3MO",
  "9dc439dbc7ef19145648a40a4252df17"
);

const index = client.initIndex("indianmovies");

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  const defaultContent = document.getElementById("defaultContent");
  const algoliaResults = document.getElementById("algoliaResults");

  const suggestedLinks = document.getElementById("suggestedLinks");
  const recommendedInsights = document.getElementById("recommendedInsights");

  const clearBtn = document.getElementById("clearSearch");

  searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();

  // Show / hide clear button
  if (query) {
    clearBtn.classList.remove("hidden");
  } else {
    clearBtn.classList.add("hidden");
  }

});

  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    // 🔁 EMPTY INPUT
    if (!query) {
      defaultContent.classList.remove("hidden");
      algoliaResults.classList.add("hidden");
      suggestedLinks.innerHTML = "";
      recommendedInsights.innerHTML = "";
      return;
    }

    // 🔍 SEARCH ALGOLIA
    const { hits } = await index.search(query);

    // ❌ NO RESULTS
    if (!hits.length) {
      defaultContent.classList.remove("hidden");
      algoliaResults.classList.add("hidden");
      return;
    }

    // ✅ RESULTS FOUND
    defaultContent.classList.add("hidden");
    algoliaResults.classList.remove("hidden");

    suggestedLinks.innerHTML = "";
    recommendedInsights.innerHTML = "";

    // 🟢 SUGGESTED LINKS (LEFT)
    hits.slice(0, 5).forEach(hit => {
      suggestedLinks.innerHTML += `
        <li class="recent-item cursor-pointer">
           <div class="trending-card flex items-center gap-5 cursor-pointer mb-6">
            <div class="flex">
              <i class="fa fa-clock ml-auto"></i>
            </div>

          <div>
            <p class="trending-text text-lg font-medium">
              ${hit["Movie Name"]}
            </p>

            <p class="text-sm text-indigo-300">
              ${hit.Genre} • ${hit.Language}
            </p>

            <p class="text-sm text-white/70">
              👍 ${hit.Votes} votes | 📅 ${hit.Year}
            </p>
          </div>
        </div>
        </li>
      `;
    });

    // 🔵 RECOMMENDED INSIGHTS (RIGHT)
    hits.slice(3, 7).forEach(hit => {
      recommendedInsights.innerHTML += `
        <div class="trending-card flex items-center gap-5 cursor-pointer">
          <div class="w-20 h-20 bg-white/10 rounded-md flex items-center justify-center">
            🎬
          </div>

          <div>
            <p class="trending-text text-lg font-medium">
              ${hit["Movie Name"]}
            </p>

            <p class="text-sm text-indigo-300">
              ${hit.Genre} • ${hit.Language}
            </p>

            <p class="text-sm text-white/70">
              👍 ${hit.Votes} votes | 📅 ${hit.Year} 
            </p>
          </div>
        </div>
      `;
    });
  });
});
