# CTC → In-Hand Salary Calculator (India)

A modern, responsive, open-source salary calculator that converts **CTC (Cost to Company)** into **monthly and annual in-hand salary** using standard Indian payroll rules, PF deductions, HRA slabs, tax rules (Old Regime), and professional tax assumptions.

This tool is built in **pure HTML + CSS + JavaScript**, requires no frameworks, and runs entirely inside the browser.  
Perfect for candidates, HR professionals, payroll teams, freelancers, and salary negotiators.

---

## 🚀 Features

- ✔ Clean & professional UI  
- ✔ Fully Responsive (mobile → desktop)  
- ✔ Monthly and annual in-hand salary  
- ✔ PF (Employee + Employer) calculations  
- ✔ Metro / Non-metro HRA logic  
- ✔ Standard deduction (₹50,000)  
- ✔ Old Regime tax calculation with 4% cess  
- ✔ Auto breakdown of Basic, HRA, LTA, Special Allowances  
- ✔ Supports custom Basic %  
- ✔ Data persists via LocalStorage  
- ✔ No frameworks required  
- ✔ Open-source & community-friendly  

---

## 🌐 Live Demo (GitHub Pages)

```
https://sarthak03dot.github.io/ctc-inhand-calculator/
```

> After uploading the code, this link will automatically work.

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/sarthak03dot/ctc-inhand-calculator
cd ctc-inhand-calculator
```

Run the calculator by opening:

```
index.html
```

No dependencies. No build process. Just open and use.

---

## 📊 How It Works

- Basic Salary = User-defined % of fixed CTC  
- HRA:
  - Metro = 50% of Basic  
  - Non-metro = 40% of Basic  
- LTA = 5% of CTC  
- Employer PF = 12% of Basic  
- Employee PF = 12% of Basic (deduction)  
- Gratuity = 4.81% of Basic  
- Standard Deduction = ₹50,000  
- Professional Tax = ₹2,400/yr  
- Income Tax = Old Regime + 4% Cess  
- In-hand = Gross – (PF + PT + Tax)

---

## 📸 Screenshots

(Add your screenshots in `/assets/screenshots/`)

```
assets/
 └── screenshots/
     ├── main-ui.png
     ├── results.png
```

---

## 🤝 Contributing

Contributions are welcome!

### How to contribute:

1. Fork the repository  
2. Create a new branch  
   ```
   git checkout -b feature-name
   ```
3. Commit your changes  
4. Submit a Pull Request  

Please read the **Pull Request Template** before submitting.

---

## 🐞 Found a Bug? Have an Idea?

Open an Issue:

```
https://github.com/sarthak03dot/ctc-inhand-calculator/issues
```

We encourage:
- Feature requests  
- UI improvements  
- Bug fixes  
- Optimization ideas  
- Tax rule enhancements (New Regime, HRA exemption, Section 80C etc.)  

---

## 🌐 GitHub Pages Hosting

1. Go to **Settings**
2. Open **Pages**
3. Under **Source** → select **main branch**
4. Select `/root` directory
5. Save

Your site will publish at:

```
https://sarthak03dot.github.io/ctc-inhand-calculator/
```


## 📜 License

Licensed under the **MIT License** — free to use, modify, and distribute.

---

## ⭐ Support The Project

If this project helped you, please **star the repo** ⭐ to support development and encourage community contributions.

---

Made with ❤️ in India.
