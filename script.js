function rupee(x) {
  return "₹" + Number(x).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// Old-regime income tax calc with 4% cess
function computeIncomeTax(taxable) {
  taxable = Math.max(0, Math.floor(taxable));
  let tax = 0;
  if (taxable <= 250000) return 0;
  let remaining = taxable - 250000;
  // 2.5L-5L -> 5%
  let slab = Math.min(remaining, 250000);
  tax += slab * 0.05;
  remaining -= slab;
  if (remaining <= 0) return Math.ceil(tax * 1.04);
  // 5L-10L -> 20%
  slab = Math.min(remaining, 500000);
  tax += slab * 0.2;
  remaining -= slab;
  if (remaining <= 0) return Math.ceil(tax * 1.04);
  // >10L -> 30%
  tax += remaining * 0.3;
  return Math.ceil(tax * 1.04);
}

// Core calculation
function calculateAll() {
  const ctc = Number(document.getElementById("ctc").value) || 0;
  const city = document.getElementById("city").value;
  const pfOpt = document.getElementById("pf").value;
  const basicPct =
    clamp(Number(document.getElementById("basicpct").value) || 40, 10, 60) /
    100;

  // Components
  const basic = Math.round(ctc * basicPct);
  const hraPct = city === "metro" ? 0.5 : 0.4;
  const hra = Math.round(basic * hraPct);
  const lta = Math.round(ctc * 0.05);
  const employerPF = Math.round(basic * 0.12);
  const gratuity = Math.round(basic * 0.0481);

  const special = Math.max(
    0,
    Math.round(ctc - (basic + hra + lta + employerPF + gratuity))
  );

  const grossAnnual = basic + hra + lta + special; // salary elements that reach employee
  const grossMonthly = Math.round(grossAnnual / 12);

  // Deductions
  const employeePF = pfOpt === "yes" ? Math.round(basic * 0.12) : 0;
  const professionalTax = 2400; // yearly assumption

  // Taxable income
  const standardDeduction = 50000;
  const deduction80C = employeePF; // simplified
  const taxable = Math.max(
    0,
    grossAnnual - standardDeduction - deduction80C - professionalTax
  );
  const incomeTax = computeIncomeTax(taxable);

  const totalDeductions = employeePF + professionalTax + incomeTax;
  const annualInhand = Math.max(0, grossAnnual - totalDeductions);
  const monthlyInhand = Math.round(annualInhand / 12);

  // Update UI
  document.getElementById("ctcLabel").textContent = "CTC: " + rupee(ctc);
  document.getElementById("monthlyInhand").textContent =
    "Monthly In-Hand: " + rupee(monthlyInhand);
  document.getElementById("annualInhandSmall").textContent =
    rupee(annualInhand);
  document.getElementById("grossMonthly").textContent = rupee(grossMonthly);
  document.getElementById("dedMonthly").textContent = rupee(
    Math.round(totalDeductions / 12)
  );

  document.getElementById("grossAnnual").textContent = rupee(grossAnnual);
  document.getElementById("employeePf").textContent = rupee(employeePF);
  document.getElementById("profTax").textContent = rupee(professionalTax);
  document.getElementById("incomeTax").textContent = rupee(incomeTax);
  document.getElementById("totalDeductions").textContent =
    rupee(totalDeductions);
  document.getElementById("annualInhandFull").textContent = rupee(annualInhand);

  // breakdown table
  const breakdown = [
    ["Basic", basic],
    ["HRA", hra],
    ["LTA", lta],
    ["Special Allowance", special],
    ["Gross (sum of above)", grossAnnual],
    ["", ""],
    ["Employee PF (deduction)", -employeePF],
    ["Professional Tax (annual)", -professionalTax],
    ["Income Tax (annual)", -incomeTax],
    ["Total Deductions", -totalDeductions],
    ["Annual In-Hand", annualInhand],
  ];

  const tbody = document.getElementById("breakdown");
  tbody.innerHTML = "";
  breakdown.forEach((row) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = row[0];
    const td2 = document.createElement("td");
    td2.className = "right";
    const val = row[1];
    if (val === "") {
      td2.textContent = "";
    } else if (val < 0) {
      td2.innerHTML = "- " + rupee(Math.abs(val));
      td2.classList.add("neg");
    } else {
      td2.textContent = rupee(val);
      if (row[0].toLowerCase().includes("in-hand")) td2.classList.add("pos");
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });

  // save last inputs to localStorage (small enhancement)
  try {
    localStorage.setItem(
      "ctc_calc_inputs",
      JSON.stringify({ ctc, city, pfOpt, basicPct: basicPct * 100 })
    );
  } catch (e) {}
}

// restore
(function init() {
  try {
    const saved = JSON.parse(localStorage.getItem("ctc_calc_inputs") || "null");
    if (saved) {
      document.getElementById("ctc").value = saved.ctc || 600000;
      document.getElementById("city").value = saved.city || "nonmetro";
      document.getElementById("pf").value = saved.pfOpt || "yes";
      document.getElementById("basicpct").value = saved.basicPct || 40;
    }
  } catch (e) {}
  calculateAll();
})();

document.getElementById("calc").addEventListener("click", calculateAll);
document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("ctc").value = 600000;
  document.getElementById("city").value = "nonmetro";
  document.getElementById("pf").value = "yes";
  document.getElementById("basicpct").value = 40;
  calculateAll();
  localStorage.removeItem("ctc_calc_inputs");
});
