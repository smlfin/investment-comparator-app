// Increment CACHE_NAME for Service Worker update to force fresh load of ALL files
const CACHE_NAME = 'investment-comparator-v16'; // NEW VERSION (fix for "Between" removal)
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  // Add your icon paths here:
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  // Add image paths for service worker cache
  './images/sml.jpeg', // Changed from .png
  './images/vfl.jpeg', // Changed from .png
  './images/snl.jpeg'  // Changed from .png
];

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

const investmentData = {
    "SML Finance Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.5%",
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "3 Lakhs to less than 15 Lakhs", // SML NCD Option 1
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ]
            },
            {
                "monthly": "13%", // Assuming 13% for above 15 Lakhs
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "15 Lakhs & above", // SML NCD Option 2
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ]
            }
        ]
    },
    "Vanchinad Finance (P) Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Sub - ordinated Debt Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Non-Convertible Debentures (NCD)": [
            // No NCDs available for Vanchinad currently, but keeping the structure for future if needed
            // The display logic will show the "no NCD" message instead of these options
            {
                "monthly": "12.5%",
                "yearly": "13.0%",
                "period": "10 YEARS",
                "remarks": "5 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ]
            },
            {
                "monthly": "13.0%",
                "yearly": "13.5%",
                "period": "10 YEARS",
                "remarks": "15 Laksh & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ]
            }
        ]
    },
    "SANGEETH NIDHI": {
        "Sangeeth Nidhi Deposits": [
            { "period": "6 MONTHS < 1 YEAR", "yearly": "9%", "remarks": "5000 and above" },
            { "period": "1 YEAR < 5 YEAR", "monthly": "12%", "yearly": "12.50%", "remarks": "5000 and above" }
        ]
    }
};

const companySelect = document.getElementById('company-select');
const productSelect = document.getElementById('product-select');
const selectedCompanyName = document.getElementById('selected-company-name');
const selectedProductName = document.getElementById('selected-product-name');
const productDetailsDiv = document.getElementById('product-details');

const investmentAmountInput = document.getElementById('investment-amount');
const calculatorResultsDiv = document.getElementById('calculator-results');


let currentSelectedProductOptions = []; // Stores ALL options for the selected product type
let currentSelectedProductType = '';    // Stores the product name (e.g., "SD 5.5 Year")
let currentSelectedDetailForCalc = null; // Stores the specific detail object chosen by radio button

function populateProductSelect(companyName) {
    productSelect.innerHTML = '<option value="">-- Select a product --</option>';
    productSelect.disabled = true;
    selectedProductName.textContent = '';
    productDetailsDiv.innerHTML = '<p class="placeholder-text">Select a company and a product to view details.</p>';

    // Clear calculator results and reset state when company selection changes
    calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
    investmentAmountInput.value = '';
    currentSelectedProductOptions = [];
    currentSelectedProductType = '';
    currentSelectedDetailForCalc = null;

    if (companyName && investmentData[companyName]) {
        const products = Object.keys(investmentData[companyName]);
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productSelect.appendChild(option);
        });
        productSelect.disabled = false;
    }
}


function displayProductDetails(companyName, productName) {
    productDetailsDiv.innerHTML = '';
    selectedCompanyName.textContent = companyName ? companyName : '';
    selectedProductName.textContent = productName ? productName : '';

    currentSelectedProductOptions = [];
    currentSelectedProductType = productName;
    currentSelectedDetailForCalc = null;

    if (companyName && productName && investmentData[companyName] && investmentData[companyName][productName]) {
        if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
            productDetailsDiv.innerHTML = `
                <div class="no-ncd-message">
                    <p><strong>Currently no NCD Issue Available. Kindly Opt SML NCD.</strong></p>
                </div>
            `;
            calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
            investmentAmountInput.value = '';
            return;
        }

        const detailsArray = investmentData[companyName][productName];
        currentSelectedProductOptions = detailsArray;

        const isDoublingProduct = productName.toLowerCase().includes('doubling');
        const isNCDProduct = productName.toLowerCase().includes('ncd');

        detailsArray.forEach((detail, index) => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '');
            const radioGroupName = `${sanitizedCompanyName}-${sanitizedProductName}-option`;
            const radioId = `option-${sanitizedCompanyName}-${sanitizedProductName}-${index}`;

            let cardContent = `
                <input type="radio" class="product-option-select" name="${radioGroupName}" id="${radioId}" value="${index}">
                <label for="${radioId}"><h4>Option ${index + 1}</h4></label>
            `;

            // *** CORRECTED LOGIC HERE ***
            if (detail.remarks) {
                let remarkText = detail.remarks;
                // Remove "Between" if it appears at the start of the remarks or generally
                remarkText = remarkText.replace(/^(Between\s|between\s)/, ''); // Remove "Between " at start (case-insensitive)
                remarkText = remarkText.replace(/\sbetween\s/ig, ' '); // Remove " between " elsewhere (case-insensitive, global)
                remarkText = remarkText.trim(); // Trim any leading/trailing spaces
                cardContent += `<p><strong>For Amount:</strong> ${remarkText}</p>`;
            }
            // *** END CORRECTED LOGIC ***

            if (detail.period) {
                cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
            }

            if (isDoublingProduct) {
                cardContent += `
                    <p><strong>Remarks:</strong> ${detail.doublingRemark}</p>
                `;
            } else if (isNCDProduct) {
                 cardContent += `
                    <p><strong>Monthly Interest:</strong> ${detail.monthly}</p>
                    <p><strong>Yearly Interest:</strong> ${detail.yearly}</p>
                    <p><strong>Closure Remark:</strong> ${detail.closureRemark}</p>
                    <p><strong>Premature Closure Terms:</strong></p>
                    <table class="closure-table product-details-table"> <thead>
                            <tr>
                                <th>Closure Period</th>
                                <th>Interest Cut</th>
                            </tr>
                        </thead>
                        <tbody>`;
                if (detail.closureTerms && detail.closureTerms.length > 0) {
                    detail.closureTerms.forEach(term => {
                        cardContent += `
                            <tr>
                                <td>${term.period}</td>
                                <td>${term.cut}</td>
                            </tr>
                        `;
                    });
                } else {
                    cardContent += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
                }
                cardContent += `
                        </tbody>
                    </table>
                `;
            }
            else { // SD and Sangeeth Nidhi
                if (detail.monthly) {
                    cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
                }
                if (detail.yearly) {
                    cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
                }
            }

            if ((isDoublingProduct || productName.toLowerCase().includes('sd')) && detail.generalRemark) {
                cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
            }

            card.innerHTML = cardContent;
            productDetailsDiv.appendChild(card);

            const radioElement = card.querySelector(`#${radioId}`);
            if (radioElement) {
                radioElement.addEventListener('change', (event) => {
                    if (event.target.checked) {
                        currentSelectedDetailForCalc = currentSelectedProductOptions[parseInt(event.target.value)];
                        calculateInvestmentReturns();
                    }
                });

                if (detailsArray.length === 1 || (index === 0 && !currentSelectedDetailForCalc)) {
                     if(radioElement) {
                        radioElement.checked = true;
                        currentSelectedDetailForCalc = detail;
                     }
                }
            }
        });
    } else {
        productDetailsDiv.innerHTML = '<p class="placeholder-text">Select a company and a product to view details.</p>';
    }

    calculateInvestmentReturns();
}

// Function to safely parse percentage strings
function parsePercentage(value) {
    if (typeof value === 'string') {
        const num = parseFloat(value.replace('%', ''));
        return isNaN(num) ? null : num / 100;
    }
    return null;
}

// Calculate Investment Returns
function calculateInvestmentReturns() {
    const amount = parseFloat(investmentAmountInput.value);
    calculatorResultsDiv.innerHTML = '';

    if (isNaN(amount) || amount <= 0) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter a valid positive amount.</p>';
        return;
    }

    if (!currentSelectedDetailForCalc || !currentSelectedProductType) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Please select a product option above to calculate returns.</p>';
        return;
    }

    const detail = currentSelectedDetailForCalc;
    const productName = currentSelectedProductType;
    const companyName = companySelect.value;

    if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
        calculatorResultsDiv.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD Issue Available for calculation. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }

    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');

    let resultsHTML = '';

    if (isDoublingProduct) {
        const maturityAmount = amount * 2;
        resultsHTML += `
            <div class="calculator-result-card">
                <h4>Doubling Scheme Result</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Maturity Amount (Approx): <strong>₹ ${maturityAmount.toLocaleString('en-IN')}</strong></p>
                <p>Period: ${detail.period}</p>
                <p>Remarks: ${detail.doublingRemark}</p>
            </div>
        `;
    } else if (isNCDProduct) {
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        let monthlyInterestDisplay = '';
        if (monthlyRate !== null) {
            const calculatedMonthlyInterest = amount * monthlyRate / 12;
            monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.monthly && (detail.monthly.toLowerCase().includes('not available') || detail.monthly.toLowerCase().includes('monthly'))) {
            monthlyInterestDisplay = "Not Available";
        } else {
             monthlyInterestDisplay = "N/A";
        }

        let annualInterestDisplay = '';
        if (yearlyRate !== null) {
            const calculatedAnnualInterest = amount * yearlyRate;
            annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.yearly && detail.yearly.toLowerCase().includes('not available')) {
             annualInterestDisplay = "Not Available";
        } else {
             annualInterestDisplay = "N/A";
        }


        resultsHTML += `
            <div class="calculator-result-card">
                <h4>NCD Return Calculation</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                <p>Period: ${detail.period}</p>
                <p>Closure Remark: ${detail.closureRemark}</p>
            </div>
            <div class="calculator-result-card">
                <h4>Premature Closure Interest Cut</h4>
                <p>Refer to the table below for potential interest reductions if closed before maturity.</p>
                <table class="closure-table">
                    <thead>
                        <tr>
                            <th>Closure Period</th>
                            <th>Interest Cut / Effective Rate</th> </tr>
                    </thead>
                    <tbody>`;
                if (detail.closureTerms && detail.closureTerms.length > 0) {
                    detail.closureTerms.forEach(term => {
                        resultsHTML += `
                            <tr>
                                <td>${term.period}</td>
                                <td>${term.cut}</td>
                            </tr>
                        `;
                    });
                } else {
                    resultsHTML += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
                }
                resultsHTML += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        let monthlyInterestDisplay = '';
        if (monthlyRate !== null) {
            const calculatedMonthlyInterest = amount * monthlyRate / 12;
            monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.monthly && detail.monthly.toLowerCase().includes('not available')) {
            monthlyInterestDisplay = "Not Available";
        } else {
             monthlyInterestDisplay = "N/A";
        }

        let annualInterestDisplay = '';
        if (yearlyRate !== null) {
            const calculatedAnnualInterest = amount * yearlyRate;
            annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.yearly && detail.yearly.toLowerCase().includes('not available')) {
             annualInterestDisplay = "Not Available";
        } else {
             annualInterestDisplay = "N/A";
        }

        resultsHTML += `
            <div class="calculator-result-card">
                <h4>Estimated Interest Earnings</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                <p>Period: ${detail.period}</p>
                ${detail.generalRemark ? `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>` : ''}
            </div>
        `;
    }

    calculatorResultsDiv.innerHTML = resultsHTML;
}

// Event Listeners
companySelect.addEventListener('change', (event) => {
    const selectedCompany = event.target.value;
    populateProductSelect(selectedCompany);
});

productSelect.addEventListener('change', (event) => {
    const selectedProduct = event.target.value;
    const selectedCompany = companySelect.value;
    displayProductDetails(selectedCompany, selectedProduct);
});

// Listener for amount input
investmentAmountInput.addEventListener('input', calculateInvestmentReturns);

// Smooth scroll for calculator link
document.querySelector('.main-nav a[href="#calculator-area"]').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});

// Initial state (ensures calculator clears)
populateProductSelect('');