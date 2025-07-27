import './css/reset.css';
import './css/style.css';

const urlParams = new URLSearchParams(window.location.search);

let theme = urlParams.get('theme');
if (theme === '' || theme == null || theme == undefined) {
    theme = "light";
}
if (theme === 'dark') {
    document.body.classList.add("dark-mode");
} else if (theme === 'light') {
    document.body.classList.add("light-mode")

}
let array1 = [
    [18, 9.3, 6.1, 4.31, 3.82],
    [63.1, 32.5, 21.3, 12.93, 1146],
    [133.8, 69.1, 45.4, 25.86, 22.92],
    [298.6, 154.7, 102.1, 51.72, 45.84]
];

let array2 = [
    [11, 7, 5, 3.84, 3.46],
    [35, 20, 15.5, 11.52, 10.38],
    [80, 44, 32, 23.04, 20.76],
    [165, 95, 70, 46.08, 41.52]
];

let array3 = [[14.96], [44.88], [89.76], [179.52]];
let array4 = [[16.96], [50.88], [101.76], [203.52]];

let array5 = [[14.91], [44.73], [89.46], [178.92]];
let array6 = [[16.68], [50.04], [100.08], [200.16]];

let isUpdated = false;

togglePayment('6');
document.getElementsByClassName("range-col")[1].style.display = "none";
document.getElementsByClassName("range-col")[0].style.display = "block";

document.getElementById("rows").addEventListener("input", function (event) {
    event.preventDefault()
    updateRangeValue(this, 'rows');
    document.getElementById("resultContainer").style.display = "none";
});

document.getElementById("columns").addEventListener("input", function (event) {
    event.preventDefault()
    updateRangeValueColumns(this);
    document.getElementById("resultContainer").style.display = "none";
});

document.getElementById("rowsPayment").addEventListener("input", function (event) {
    event.preventDefault()
    updateRangeValuePayment(this);
    document.getElementById("resultContainer").style.display = "none";
});

document.getElementById("calculateBtn").addEventListener("click", function (event) {
    event.preventDefault()
    // updateRangeValue(this, 'rows');
    // updateRangeValueColumns(this);
    showLoader();
});

document.addEventListener("DOMContentLoaded", function () {
    updateRangeValue(document.getElementById("rows"), 'rows');
    updateRangeValueColumns(document.getElementById("columns"));
});


function showLoader() {
    if (!isUpdated) return;
    document.getElementById("loader").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
    setTimeout(calculateResults, 500);
}

function calculateResults() {
    if (document.getElementById("amountInput").value == "")
        document.getElementById("amountInput").value = "0"
    let rowSelection = parseInt(document.getElementById("rows").value) - 1;
    let columnSelection = parseInt(document.getElementById("columns").value) - 1;
    let rowPaymentSelection = parseInt(document.getElementById("rowsPayment").value) - 1;
    let accountType = document.querySelector(".toggleAccount .toggleSelect__link--active").getAttribute("data-value");
    let percentage = parseInt(document.querySelector(".percentage .toggleSelect__link--active").getAttribute("data-value"));
    let payment = document.querySelector(".payment .toggleSelect__link--active").getAttribute("data-value");
    let operation = document.querySelector(".toggleKarmozd .toggleSelect__link--active").getAttribute("data-value");

    // console.log("accountType: ", accountType)
    // console.log("operation: ", operation)
    // console.log("percentage: ", percentage)
    // console.log("payment: ", payment)

    // console.log("rowSelection: ", rowSelection)
    // console.log("columnSelection: ", columnSelection)

    updateRangeValue(document.getElementById("rows"), 'rows');
    updateRangeValueColumns(document.getElementById("columns"));


    let selectedArray;
    if (percentage === 0 && payment == "multi") selectedArray = array2;
    if (percentage === 4 && payment == "multi") selectedArray = array1;

    if (accountType == "0" && percentage === 0 && payment == "single") selectedArray = array3;
    if (accountType == "0" && percentage === 4 && payment == "single") selectedArray = array4;
    if (accountType == "0.5" && percentage === 0 && payment == "single") selectedArray = array5;
    if (accountType == "0.5" && percentage === 4 && payment == "single") selectedArray = array6;

    let arrayResultp = "نرخ کارمزد:" + "<span>" + percentage + "</span>";
    document.getElementById("arrayResultp").innerHTML = arrayResultp;


    let selectedValue1
    if (payment == "multi")
        selectedValue1 = parseFloat(selectedArray[rowSelection][columnSelection]);
    if (payment == "single")
        selectedValue1 = parseFloat(selectedArray[rowPaymentSelection][0]);

    let inputValue = parseInt(document.getElementById("amountInput").value.replace(/\D/g, ''));

    let result;
    if (operation === "facilities") {
        result = Math.floor(((inputValue * 100) / selectedValue1), 0);
    } else if (operation === "deposit") {
        result = Math.floor(((inputValue * selectedValue1) / 100), 0);
    }


    let arrayResultText = "نرخ سود :" + "<span>" + selectedValue1 + "</span>";

    document.getElementById("arrayResult").innerHTML = arrayResultText;

    if (operation === "facilities") {
        let formulaResultText = "محاسبه سپرده: " + "<span>" + separateAmountByThousands(result) + " ریال " + "</span>";

        document.getElementById("formulaResult").innerHTML = formulaResultText;
    } else if (operation === "deposit") {
        let formulaResultText = "محاسبه تسهیلات: " + "<span>" + separateAmountByThousands(result) + " ریال " + "</span>";

        document.getElementById("formulaResult").innerHTML = formulaResultText;
    }



    document.getElementById("loader").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";
}

function updateRangeValuePayment(input, type) {
    isUpdated = true;
    let rangeValue = input.value;
    let rangeDisplay = "";
    switch (parseInt(rangeValue)) {
        case 1:
            rangeDisplay = "1 ماهه";
            break;
        case 2:
            rangeDisplay = "3 ماهه";
            break;
        case 3:
            rangeDisplay = "6 ماهه";
            break;
        case 4:
            rangeDisplay = "12 ماهه";
            break;
        default:
            rangeDisplay = "1 ماهه";
            break;
    }
    document.getElementById("rangeValuePayment").innerText = rangeDisplay;
}

function updateRangeValue(input, type) {
    isUpdated = true;
    let rangeValue = input.value;
    let rangeDisplay = "";
    switch (parseInt(rangeValue)) {
        case 1:
            rangeDisplay = "1 ماهه";
            break;
        case 2:
            rangeDisplay = "3 ماهه";
            break;
        case 3:
            rangeDisplay = "6 ماهه";
            break;
        case 4:
            rangeDisplay = "12 ماهه";
            break;
        default:
            rangeDisplay = "1 ماهه";
            break;
    }
    document.getElementById("rangeValue").innerText = rangeDisplay;
}

function updateRangeValueColumns(input) {
    isUpdated = true;
    let rangeValue = input.value;
    let rangeDisplay = "";
    switch (parseInt(rangeValue)) {
        case 1:
            rangeDisplay = "12 ماهه";
            break;
        case 2:
            rangeDisplay = "24 ماهه";
            break;
        case 3:
            rangeDisplay = "36 ماهه";
            break;
        case 4:
            rangeDisplay = "48 ماهه";
            break;
        case 5:
            rangeDisplay = "60 ماهه";
            break;
        default:
            rangeDisplay = "12 ماهه";
            break;
    }
    document.getElementById("rangeValueColumns").innerText = rangeDisplay;
}

function separateAmountByThousands(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatAmount(input) {
    input.value = separateAmountByThousands(input.value.replace(/\D/g, ''));
}



document.getElementById("amountInput").addEventListener("input", function () {
    formatAmount(this);
    document.getElementById("resultContainer").style.display = "none";
});
document.getElementById("toggleRequest").addEventListener("click", function () {
    toggleSelect('request');
});
document.getElementById("toggleDeposit").addEventListener("click", function () {
    toggleSelect('deposit');
});
document.getElementById("toggleEhsan0").addEventListener("click", function () {
    toggleSelect('ehsan0');
});
document.getElementById("toggleEhsanNim").addEventListener("click", function () {
    toggleSelect('ehsanNim');
});
document.getElementById("toggleZeroPercent").addEventListener("click", function () {
    togglePercentage('0');
    toggleSelect('toggleZeroPercent');
});
document.getElementById("toggleFourPercent").addEventListener("click", function () {
    togglePercentage('4');
    toggleSelect('toggleFourPercent');
});
document.getElementById("toggleOneTime").addEventListener("click", function () {
    togglePayment('0');
    toggleSelect('toggleOneTime');
    document.getElementsByClassName("range-col")[0].style.display = "none";
    document.getElementsByClassName("range-col")[1].style.display = "block";
});
document.getElementById("toggleMultiTime").addEventListener("click", function () {
    togglePayment('6');
    toggleSelect('toggleMultiTime');
    document.getElementsByClassName("range-col")[1].style.display = "none";
    document.getElementsByClassName("range-col")[0].style.display = "block";
});
document.getElementById("toggleColorLight").addEventListener("click", function () {
    toggleChange('light');
});
document.getElementById("toggleColorDark").addEventListener("click", function () {
    toggleChange('dark');
});


function toggleSelect(option) {
    document.getElementById("resultContainer").style.display = "none";

    let toggleRequest = document.getElementById("toggleRequest");
    let toggleDeposit = document.getElementById("toggleDeposit");
    let toggleEhsan0 = document.getElementById("toggleEhsan0");
    let toggleEhsanNim = document.getElementById("toggleEhsanNim");
    let toggleOneTime = document.getElementById("toggleOneTime");
    let toggleMultiTime = document.getElementById("toggleMultiTime");
    let toggleZeroPercent = document.getElementById("toggleZeroPercent");
    let toggleFourPercent = document.getElementById("toggleFourPercent");

    if (option === 'request') {
        toggleRequest.classList.add("toggleSelect__link--active");
        toggleDeposit.classList.remove("toggleSelect__link--active");
        document.getElementById("amountInputLabel").innerHTML = "مبلغ تسهیلات"
    } else if (option === 'deposit') {
        toggleRequest.classList.remove("toggleSelect__link--active");
        toggleDeposit.classList.add("toggleSelect__link--active");
        document.getElementById("amountInputLabel").innerHTML = "مبلغ سپرده"
    }

    if (option === 'ehsan0') {
        toggleEhsan0.classList.add("toggleSelect__link--active");
        toggleEhsanNim.classList.remove("toggleSelect__link--active");
    } else if (option === 'ehsanNim') {
        toggleEhsan0.classList.remove("toggleSelect__link--active");
        toggleEhsanNim.classList.add("toggleSelect__link--active");
    }

    if (option === 'toggleOneTime') {
        toggleOneTime.classList.add("toggleSelect__link--active");
        toggleMultiTime.classList.remove("toggleSelect__link--active");
    } else if (option === 'toggleMultiTime') {
        toggleOneTime.classList.remove("toggleSelect__link--active");
        toggleMultiTime.classList.add("toggleSelect__link--active");
    }

    if (option === 'toggleZeroPercent') {
        toggleZeroPercent.classList.add("toggleSelect__link--active");
        toggleFourPercent.classList.remove("toggleSelect__link--active");
    } else if (option === 'toggleFourPercent') {
        toggleZeroPercent.classList.remove("toggleSelect__link--active");
        toggleFourPercent.classList.add("toggleSelect__link--active");
    }


    isUpdated = true;
}
function toggleChange(option) {
    document.getElementById("resultContainer").style.display = "none";

    let toggleColorLight = document.getElementById("toggleColorLight");
    let toggleColorDark = document.getElementById("toggleColorDark");
    let sectionCalculator = document.getElementById("sectionCalculator");
    if (option === 'light') {
        toggleColorLight.classList.add("changeselect__link--active");
        toggleColorDark.classList.remove("changeselect__link--active");
        sectionCalculator.classList.remove("changeselect__dark");
    } else if (option === 'dark') {
        toggleColorLight.classList.remove("changeselect__link--active");
        toggleColorDark.classList.add("changeselect__link--active");
        sectionCalculator.classList.add("changeselect__dark");
    }

}

function togglePercentage(option) {
    let toggleZeroPercent = document.getElementById("toggleZeroPercent");
    let toggleFourPercent = document.getElementById("toggleFourPercent");

    if (option === '0') {
        toggleZeroPercent.classList.add("toggleSelect__link--active");
        toggleFourPercent.classList.remove("toggleSelect__link--active");
    } else if (option === '4') {
        toggleZeroPercent.classList.remove("toggleSelect__link--active");
        toggleFourPercent.classList.add("toggleSelect__link--active");
    }
    isUpdated = true;
}
function togglePayment(option) {
    let toggleOneTime = document.getElementById("toggleOneTime");
    let toggleMultiTime = document.getElementById("toggleMultiTime");

    if (option === '0') {
        toggleOneTime.classList.add("toggleSelect__link--active");
        toggleMultiTime.classList.remove("toggleSelect__link--active");
    } else if (option === '6') {
        toggleOneTime.classList.remove("toggleSelect__link--active");
        toggleMultiTime.classList.add("toggleSelect__link--active");
    }
    isUpdated = true;
}


document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("calculateBtn").click();
    }
});







