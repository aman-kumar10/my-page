function toggleSidebar() {
    const sidebar = document.getElementById("header");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("sidebar-open");
    overlay.classList.toggle("active");
}

const sheetId = "1oOD1YfyWnWBs-t3RFduhEGptTBwiCkvojmBQDJ6bL98";
const apiKey = "AIzaSyDT_XhNJeOb9fIeWiFOjgpXGa6QQzikbCw";
const sheetName = "mytestpage";

async function loadSiteData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const rows = data.values;

        let siteData = {};
        rows.forEach(row => {
            const key = row[0];
            const value = row[1] || "";
            siteData[key] = value;
        });

        // Convert Google Drive preview to direct link
        function convertDriveURL(url) {
            if (url.includes("uc?export=view")) return url;
            const match = url.match(/\/d\/(.*?)\//);
            if (!match) return url;
            const fileId = match[1];
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }

        siteData.profile_image = convertDriveURL(siteData.profile_image);

        // Set background image
        const aboutSection = document.querySelector(".about-me.background-image");
        if (aboutSection) {
            aboutSection.style.backgroundImage = `
                linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                url('${siteData.profile_image}')
            `;
        }

        // Profile
        document.getElementById("profile_image").src = siteData.profile_image;
        document.getElementById("name").innerText = siteData.name;

        // Body Text
        document.getElementById("main_heading").innerText = siteData.name;
        document.getElementById("main_title").innerText = siteData.title;

        // Menu (fixed: no += duplicate)
        document.getElementById("menu_home").innerHTML = `<i class="fa fa-home"></i> ${siteData.menu_home}`;
        document.getElementById("menu_about").innerHTML = `<i class="fa fa-user"></i> ${siteData.menu_about}`;
        document.getElementById("menu_resume").innerHTML = `<i class="fa fa-file"></i> ${siteData.menu_resume}`;
        document.getElementById("menu_portfolio").innerHTML = `<i class="fa fa-images"></i> ${siteData.menu_portfolio}`;
        document.getElementById("menu_dropdown").innerHTML = `<i class="fa fa-bars"></i> ${siteData.menu_dropdown}`;
        document.getElementById("menu_contact").innerHTML = `<i class="fa fa-envelope"></i> ${siteData.menu_contact}`;

        // Social Links
        document.getElementById("twitter_url").href = siteData.twitter_url;
        document.getElementById("facebook_url").href = siteData.facebook_url;
        document.getElementById("instagram_url").href = siteData.instagram_url;
        document.getElementById("skype_url").href = siteData.skype_url;
        document.getElementById("linkedin_url").href = siteData.linkedin_url;

    } catch (error) {
        console.error("Error loading site data:", error);
    }
}

loadSiteData();
