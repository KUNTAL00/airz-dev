const CURRENT_VERSION = "1.0.0";
const UPDATE_API = "http://127.0.0.1:8081/api/version.php";

async function checkForUpdate() {
  try {
    const res = await fetch(UPDATE_API, { cache: "no-store" });
    const data = await res.json();

    if (data.latest_version !== CURRENT_VERSION) {
      showUpdatePopup(data);
    }
  } catch (e) {
    console.log("Update check failed", e);
  }
}

function showUpdatePopup(data) {
  const overlay = document.createElement("div");
  overlay.style = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
  `;

  overlay.innerHTML = `
    <div style="
      background:#fff;
      width:85%;
      max-width:320px;
      border-radius:16px;
      padding:20px;
      text-align:center;
      font-family:Inter,sans-serif;
    ">
      <h3 style="font-size:18px;font-weight:600;margin-bottom:8px">
        Update Available
      </h3>
      <p style="font-size:14px;color:#555;margin-bottom:16px">
        ${data.message}
      </p>

      <button id="updateBtn" style="
        width:100%;
        padding:12px;
        background:#ff5724;
        color:#fff;
        border:none;
        border-radius:10px;
        font-size:15px;
      ">
        Update Now
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("updateBtn").onclick = () => {
    window.location.href = data.apk_url;
  };
}

document.addEventListener("DOMContentLoaded", checkForUpdate);
