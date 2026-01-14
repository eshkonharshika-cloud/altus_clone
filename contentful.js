const client = contentful.createClient({
  space: "ivo5sc8bbuvy",
  accessToken: "JO7D_eymAh2tUvzusBPEOUrlpQvjGVjKhFlBBpFxKyQ",
});

// hero section

client
  .getEntries({
    content_type: "hero", // ⚠️ MUST MATCH API ID
    limit: 1,
  })
  .then((response) => {
    if (!response.items.length) {
      console.error("No Hero entries found");
      return;
    }

    const hero = response.items[0].fields;

    // Title
    const titleEl = document.getElementById("hero-title");
    if (titleEl && hero.title) {
      titleEl.innerHTML = hero.title.replace(/\n/g, "<br>");
    }

    // Description
    const descEl = document.getElementById("hero-description");
    if (descEl && hero.description) {
      descEl.textContent = hero.description;
    }

    // Primary Button
    const primaryBtnText = document.querySelector(
      "#hero-primary-btn span"
    );
    if (primaryBtnText && hero.primaryButtonText) {
      primaryBtnText.textContent = hero.primaryButtonText;
    }

    // Secondary Button
    const secondaryBtnText = document.querySelector(
      "#hero-secondary-btn span"
    );
    if (secondaryBtnText && hero.secondaryButtonText) {
      secondaryBtnText.textContent = hero.secondaryButtonText;
    }
  })
  .catch((error) => {
    console.error("Hero fetch error:", error);
  });

// event section

client
  .getEntries({
    content_type: "eventSection", 
    limit: 1,
  })
  .then((res) => {
    if (!res.items.length) {
      console.error("No Event entries found");
      return;
    }

    const event = res.items[0].fields;

    // Date
    const dateEl = document.getElementById("event-date");
    if (dateEl && event.date) {
      dateEl.textContent = event.date;
    }

    // Location
    const locationEl = document.getElementById("event-location");
    if (locationEl && event.location) {
      locationEl.textContent = event.location;
    }

    // Event Name (line breaks supported)
    const nameEl = document.getElementById("event-name");
    if (nameEl && event.eventName) {
      nameEl.innerHTML = event.eventName.replace(/\n/g, "<br>");
    }

    // Description
    const descEl = document.getElementById("event-description");
    if (descEl && event.description) {
      descEl.textContent = event.description;
    }

    // Button Text
    const btnText = document.querySelector("#event-button span");
    if (btnText && event.buttonText) {
      btnText.textContent = event.buttonText;
    }

    // Image
    const imgEl = document.getElementById("event-image");
    if (imgEl && event.image) {
      imgEl.src = "https:" + event.image.fields.file.url;
      imgEl.alt = event.eventName || "Event image";
    }
  })
  .catch((err) => {
    console.error("Event fetch error:", err);
  });

  // ABOUT HIGHLIGHT SECTION
client
  .getEntries({
    content_type: "aboutHighlightSection",
    limit: 1,
  })
  .then((res) => {
    if (!res.items.length) return;

    const about = res.items[0].fields;

    const descEl = document.getElementById("about-highlight-description");

    if (!descEl) return;

    // Preserve line breaks from Contentful
    descEl.innerHTML = about.description.replace(/\n/g, "<br><br>");
  })
  .catch((err) => {
    console.error("About Highlight error:", err);
  });

  // STATS SECTION
client
  .getEntries({
    content_type: "statSection", // 
    order: "sys.createdAt",
  })
  .then((res) => {
    const container = document.getElementById("stats-grid");
    if (!container || !res.items.length) return;

    container.innerHTML = "";

    res.items.forEach((item) => {
      const { value, label } = item.fields;

      const card = document.createElement("div");
      card.className = "stat-card";

      card.innerHTML = `
        <h3 class="text-lime-400 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
          ${value}
        </h3>
        <p class="text-white text-sm sm:text-base tracking-wide">
          ${label}
        </p>
      `;

      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Stats section error:", err);
  });


  // ARTICLE SECTION
client
  .getEntries({
    content_type: "article", // 🔴 MUST MATCH API ID
    order: "-fields.publishDate",
    limit: 3, // change if needed
  })
  .then((res) => {
    const grid = document.getElementById("article-grid");
    if (!grid || !res.items.length) return;

    grid.innerHTML = "";

    res.items.forEach((item) => {
      const { title, publishDate, image, readMoreLink } = item.fields;

      const formattedDate = new Date(publishDate).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      );

      const article = document.createElement("article");
      article.className =
        "cards bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden";

      article.innerHTML = `
        <div class="card-image h-52 overflow-hidden">
          <img
            src="https:${image.fields.file.url}"
            alt="${title}"
            width="640"
            height="420"
            loading="lazy"
          />
        </div>

        <div class="card-container p-6">
          <time class="card-date block text-base text-gray-500 mb-2" datetime="${publishDate}">
            ${formattedDate}
          </time>

          <h3 class="text-2xl font-bold text-slate-900 mb-6 leading-snug">
            ${title}
          </h3>

          <a
            href="${readMoreLink}"
            class="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:gap-3 transition-all"
          >
            Read more
            <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
          </a>
        </div>
      `;

      grid.appendChild(article);
    });
  })
  .catch((err) => {
    console.error("Article section error:", err);
  });

  // PRESS RELEASE SECTION
client
  .getEntries({
    content_type: "pressRelease", // 🔴 must match API ID
    order: "-fields.publishDate",
    limit: 3,
  })
  .then((res) => {
    const list = document.getElementById("press-list");
    if (!list || !res.items.length) return;

    list.innerHTML = "";

    res.items.forEach((item) => {
      const { title, publishDate } = item.fields;

      const formattedDate = new Date(publishDate).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      );

      const article = document.createElement("article");
      article.className = "press-item";

      article.innerHTML = `
        <span class="press-date block text-base text-gray-500 mb-3">
          ${formattedDate}
        </span>

        <h3 class="press-title text-xl font-bold text-blue-900 leading-snug">
          ${title}
        </h3>
      `;

      list.appendChild(article);
    });
  })
  .catch((err) => {
    console.error("Press release error:", err);
  });


