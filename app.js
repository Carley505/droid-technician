/* ==========================================================================
   DROID TECHNICIANS INTERACTIVE APPLICATION SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lucide SVG Icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    /* ----------------------------------------------------------------------
       1. Sticky Header scroll handling
       ---------------------------------------------------------------------- */
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ----------------------------------------------------------------------
       2. Mobile Navigation Drawer
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerClose = document.getElementById("drawerClose");
    const drawerOverlay = document.getElementById("drawerOverlay");
    const drawerLinks = document.querySelectorAll(".drawer-link, .drawer-btn");

    function openDrawer() {
        mobileDrawer.classList.add("open");
        drawerOverlay.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevents background scroll
    }

    function closeDrawer() {
        mobileDrawer.classList.remove("open");
        drawerOverlay.classList.remove("open");
        document.body.style.overflow = ""; // Restores background scroll
    }

    if (mobileToggle) mobileToggle.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

    // Close mobile drawer when click navigates to any sections
    drawerLinks.forEach(link => {
        link.addEventListener("click", closeDrawer);
    });

    /* ----------------------------------------------------------------------
       3. Active Navigation Link Highlighting on Scroll
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    // IntersectionObserver to watch which section occupies the viewport
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Focus window in middle-top viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                // Update navigation links state
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ----------------------------------------------------------------------
       4. Service Coverage checker interaction
       ---------------------------------------------------------------------- */
    const checkerSelect = document.getElementById("checkerSelect");
    const checkerBtn = document.getElementById("checkerBtn");
    const checkerResult = document.getElementById("checkerResult");

    if (checkerBtn && checkerSelect && checkerResult) {
        checkerBtn.addEventListener("click", () => {
            const val = checkerSelect.value;
            
            if (!val) {
                checkerResult.innerHTML = `
                    <div class="result-placeholder" style="color: var(--error);">
                        <i data-lucide="alert-circle" style="color: var(--error);"></i>
                        <span>Please select a location first.</span>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            // Simulate quick calculation/network status check delay
            checkerBtn.disabled = true;
            checkerBtn.textContent = "Checking Database...";
            
            setTimeout(() => {
                checkerBtn.disabled = false;
                checkerBtn.textContent = "Verify Availability";

                let html = "";
                
                switch (val) {
                    case "nairobi":
                    case "kiambu":
                    case "machakos":
                    case "kajiado":
                        html = `
                            <div class="coverage-alert available">
                                <i data-lucide="check-circle" class="coverage-alert-icon"></i>
                                <div>
                                    <div class="coverage-alert-title">Active Coverage Zone</div>
                                    <div class="coverage-alert-desc">
                                        Standard Service Area. Technicians are based here. Next-day installations and same-day support visits are available. <strong>No extra mobilization fees.</strong>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case "nakuru":
                    case "mombasa":
                    case "kisumu":
                    case "uasingishu":
                        html = `
                            <div class="coverage-alert limited">
                                <i data-lucide="info" class="coverage-alert-icon"></i>
                                <div>
                                    <div class="coverage-alert-title">Extended Coverage Zone</div>
                                    <div class="coverage-alert-desc">
                                        We support this area via regional coordinators. Travel dispatch schedules are organized weekly (typically Tuesdays & Fridays). On-demand installations attract a minor transit surcharge.
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case "other":
                        html = `
                            <div class="coverage-alert limited">
                                <i data-lucide="help-circle" class="coverage-alert-icon"></i>
                                <div>
                                    <div class="coverage-alert-title">Out-of-Area Coverage</div>
                                    <div class="coverage-alert-desc">
                                        We execute projects outside our core counties on request. Please submit a request via the contact form indicating your specific town, and we will quote travel costs and schedules.
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                }

                checkerResult.innerHTML = html;
                // Re-trigger icon rendering for dynamically loaded template
                lucide.createIcons();
            }, 600);
        });
    }

    /* ----------------------------------------------------------------------
       5. Contact Estimate Form Handling & Validation
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const submittedPhone = document.getElementById("submittedPhone");
    const closeSuccessBtn = document.getElementById("closeSuccessBtn");
    const submitBtn = document.getElementById("submitBtn");

    // Regular Expression for Kenya Phone Numbers (07..., 01..., +254..., 254...)
    const kenyaPhoneRegex = /^(?:254|\+254|0)?(7|1)\d{8}$/;

    function validateField(inputElement, errorElement, condition) {
        if (condition) {
            inputElement.classList.remove("invalid");
            return true;
        } else {
            inputElement.classList.add("invalid");
            return false;
        }
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("formName");
            const phoneInput = document.getElementById("formPhone");
            const serviceSelect = document.getElementById("formService");
            const locationInput = document.getElementById("formLocation");

            // Perform Validations
            const isNameValid = validateField(nameInput, null, nameInput.value.trim().length > 1);
            const isPhoneValid = validateField(phoneInput, null, kenyaPhoneRegex.test(phoneInput.value.replace(/\s+/g, "")));
            const isServiceValid = validateField(serviceSelect, null, serviceSelect.value !== "");
            const isLocationValid = validateField(locationInput, null, locationInput.value.trim().length > 1);

            // If any check fails, do not submit
            if (!isNameValid || !isPhoneValid || !isServiceValid || !isLocationValid) {
                // Focus the first invalid field
                const firstInvalid = contactForm.querySelector(".invalid");
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // If valid, trigger submission loading animation
            const btnText = submitBtn.querySelector(".btn-text");
            const btnSpinner = submitBtn.querySelector(".btn-spinner");

            submitBtn.disabled = true;
            btnText.classList.add("hidden");
            btnSpinner.classList.remove("hidden");

            // Simulate API submission delay (1.5 seconds)
            setTimeout(() => {
                // Reset submit button state
                submitBtn.disabled = false;
                btnText.classList.remove("hidden");
                btnSpinner.classList.add("hidden");

                // Populate phone confirmation in success popup
                if (submittedPhone) {
                    submittedPhone.textContent = phoneInput.value.trim();
                }

                // Show Success Screen
                if (formSuccess) {
                    formSuccess.classList.remove("hidden");
                }

                // Clear fields
                contactForm.reset();
                
                // Clear any leftover visual validation states
                [nameInput, phoneInput, serviceSelect, locationInput].forEach(inp => {
                    inp.classList.remove("invalid");
                });

            }, 1500);
        });

        // Add real-time input error dismissal on type/change
        const inputs = contactForm.querySelectorAll(".form-control");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                if (input.classList.contains("invalid")) {
                    input.classList.remove("invalid");
                }
            });
            input.addEventListener("change", () => {
                if (input.classList.contains("invalid")) {
                    input.classList.remove("invalid");
                }
            });
        });
    }

    // Success Popup Close Handler
    if (closeSuccessBtn && formSuccess) {
        closeSuccessBtn.addEventListener("click", () => {
            formSuccess.classList.add("hidden");
        });
    }
});
