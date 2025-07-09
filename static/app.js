const s = ["auto", "light", "dark"], a = document.querySelector(".js-theme");
function p() {
  let t = h();
  t += 1, s[t] || (t = 0);
  const e = s[t];
  setColorMode(e), sessionStorage._theme = e, m(e);
}
function h() {
  return s.indexOf(document.documentElement.getAttribute("data-color-mode") || "auto");
}
function m(t) {
  const e = a.getAttribute("data-aria-" + t);
  a.setAttribute("aria-label", e);
}
a && (a.addEventListener("click", p), m(s[h()] || "auto"));
const l = document.querySelectorAll("time.dt-published"), g = document.documentElement.lang;
function b(t) {
  const e = t.getAttribute("datetime"), n = new Date(e), o = Intl.DateTimeFormat(g, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  t.textContent = o.format(n);
}
for (let t = 0; t < l.length; t++)
  b(l[t]);
function u(t) {
  let e = t.getAttribute("data-src");
  e || (e = t.getAttribute("data-cover"));
  let n = "background-image:url(" + e + ")";
  const o = t.getAttribute("data-width"), r = t.getAttribute("data-height");
  if (o && r) {
    const i = parseInt(r, 10) * 100 / parseInt(o, 10) + "vw";
    n += ";height:" + i;
  }
  t.setAttribute("style", n);
}
const c = document.querySelectorAll(".js-cover");
if ("IntersectionObserver" in window) {
  let t = new IntersectionObserver(function(e, n) {
    e.forEach(function(o) {
      o.isIntersecting && (u(o.target), t.unobserve(o.target));
    });
  });
  for (let e = 0; e < c.length; e++)
    t.observe(c[e]);
} else
  for (let t = 0; t < c.length; t++)
    u(c[t]);
const w = {
  x: "https://x.com/intent/post?text={t}&url={u}",
  bluesky: "https://bsky.app/intent/compose?text={t}",
  facebook: "http://www.facebook.com/sharer.php?u={u}",
  weibo: "http://service.weibo.com/share/share.php?title={t}&url={u}",
  telegram: "https://telegram.me/share/url?text={t}&url={u}"
}, f = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1" d="M18 6L6 18M6 6l12 12"></path></svg>';
function v(t) {
  let e = document.querySelector("#wechat-share");
  if (e)
    return e.classList.add("show");
  e = document.createElement("div"), e.id = "wechat-share", e.classList.add("show");
  const n = document.createElement("button");
  n.innerHTML = f, n.addEventListener("click", () => {
    e.classList.remove("show");
  }), e.appendChild(n);
  const o = document.createElement("div");
  e.appendChild(o), import("https://esm.sh/uqr").then(({ renderSVG: r }) => {
    o.innerHTML = "<h3>扫描二维码分享到微信</h3>" + r(t);
  }), document.body.appendChild(e);
}
function y(t) {
  const e = document.querySelector('meta[property="og:title"]').getAttribute("content"), n = document.querySelector('link[rel="canonical"]').getAttribute("href");
  t.addEventListener("click", function(o) {
    o.preventDefault();
    const r = t.getAttribute("data-type");
    if (r === "wechat")
      return v(n);
    let i = w[r];
    r === "bluesky" ? i = i.replace("{t}", encodeURIComponent(e + " " + n)) : i = i.replace("{t}", encodeURIComponent(e)).replace("{u}", encodeURIComponent(n)), window.open(i, "_blank", "width=615,height=505");
  });
}
const d = document.querySelectorAll("a.js-share");
for (let t = 0; t < d.length; t++)
  y(d[t]);
