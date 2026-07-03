(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function u(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=u(e);fetch(e.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{typeof lucide<"u"&&lucide.createIcons();const h=document.querySelector(".header");window.addEventListener("scroll",()=>{window.scrollY>40?h.classList.add("scrolled"):h.classList.remove("scrolled")});const n=document.getElementById("mobileToggle"),u=document.getElementById("mobileDrawer"),a=document.getElementById("drawerClose"),e=document.getElementById("drawerOverlay"),s=document.querySelectorAll(".drawer-link, .drawer-btn");function l(){u.classList.add("open"),e.classList.add("open"),document.body.style.overflow="hidden"}function y(){u.classList.remove("open"),e.classList.remove("open"),document.body.style.overflow=""}n&&n.addEventListener("click",l),a&&a.addEventListener("click",y),e&&e.addEventListener("click",y),s.forEach(i=>{i.addEventListener("click",y)});const S=document.querySelectorAll("section[id]"),O=document.querySelectorAll(".nav-link"),q={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},x=new IntersectionObserver(i=>{i.forEach(t=>{if(t.isIntersecting){const r=t.target.getAttribute("id");O.forEach(c=>{c.getAttribute("href")===`#${r}`?c.classList.add("active"):c.classList.remove("active")})}})},q);S.forEach(i=>{x.observe(i)});const E=document.getElementById("checkerSelect"),o=document.getElementById("checkerBtn"),L=document.getElementById("checkerResult");o&&E&&L&&o.addEventListener("click",()=>{const i=E.value;if(!i){L.innerHTML=`
                    <div class="result-placeholder" style="color: var(--error);">
                        <i data-lucide="alert-circle" style="color: var(--error);"></i>
                        <span>Please select a location first.</span>
                    </div>
                `,lucide.createIcons();return}o.disabled=!0,o.textContent="Checking Database...",setTimeout(()=>{o.disabled=!1,o.textContent="Verify Availability";let t="";switch(i){case"nairobi":case"kiambu":case"machakos":case"kajiado":t=`
                            <div class="coverage-alert available">
                                <i data-lucide="check-circle" class="coverage-alert-icon"></i>
                                <div>
                                    <div class="coverage-alert-title">Active Coverage Zone</div>
                                    <div class="coverage-alert-desc">
                                        Standard Service Area. Technicians are based here. Next-day installations and same-day support visits are available. <strong>No extra mobilization fees.</strong>
                                    </div>
                                </div>
                            </div>
                        `;break;case"nakuru":case"mombasa":case"kisumu":case"uasingishu":t=`
                            <div class="coverage-alert limited">
                                <i data-lucide="info" class="coverage-alert-icon"></i>
                                <div>
                                    <div class="coverage-alert-title">Extended Coverage Zone</div>
                                    <div class="coverage-alert-desc">
                                        We support this area via regional coordinators. Travel dispatch schedules are organized weekly (typically Tuesdays & Fridays). On-demand installations attract a minor transit surcharge.
                                    </div>
                                </div>
                            </div>
                        `;break;case"other":t=`
                            <div class="coverage-alert limited">
                                <i data-lucide="help-circle" class="coverage-alert-icon"></i>
                                <div>
                                    <div class="coverage-alert-title">Out-of-Area Coverage</div>
                                    <div class="coverage-alert-desc">
                                        We execute projects outside our core counties on request. Please submit a request via the contact form indicating your specific town, and we will quote travel costs and schedules.
                                    </div>
                                </div>
                            </div>
                        `;break}L.innerHTML=t,lucide.createIcons()},600)});const d=document.getElementById("contactForm"),v=document.getElementById("formSuccess"),I=document.getElementById("submittedPhone"),w=document.getElementById("closeSuccessBtn"),m=document.getElementById("submitBtn"),A=/^(?:254|\+254|0)?(7|1)\d{8}$/;function f(i,t,r){return r?(i.classList.remove("invalid"),!0):(i.classList.add("invalid"),!1)}d&&(d.addEventListener("submit",t=>{t.preventDefault();const r=document.getElementById("formName"),c=document.getElementById("formPhone"),b=document.getElementById("formService"),p=document.getElementById("formLocation"),P=f(r,null,r.value.trim().length>1),C=f(c,null,A.test(c.value.replace(/\s+/g,""))),T=f(b,null,b.value!==""),D=f(p,null,p.value.trim().length>1);if(!P||!C||!T||!D){const g=d.querySelector(".invalid");g&&g.focus();return}const B=m.querySelector(".btn-text"),k=m.querySelector(".btn-spinner");m.disabled=!0,B.classList.add("hidden"),k.classList.remove("hidden"),setTimeout(()=>{m.disabled=!1,B.classList.remove("hidden"),k.classList.add("hidden"),I&&(I.textContent=c.value.trim()),v&&v.classList.remove("hidden"),d.reset(),[r,c,b,p].forEach(g=>{g.classList.remove("invalid")})},1500)}),d.querySelectorAll(".form-control").forEach(t=>{t.addEventListener("input",()=>{t.classList.contains("invalid")&&t.classList.remove("invalid")}),t.addEventListener("change",()=>{t.classList.contains("invalid")&&t.classList.remove("invalid")})})),w&&v&&w.addEventListener("click",()=>{v.classList.add("hidden")})});
