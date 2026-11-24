# [პროექტის დასახელება - მაგ: Cloud Infrastructure &amp; SaaS Dashboard]
## პროექტის მიმოხილვა
[მოკლედ აღწერეთ პროექტის მიზანი, რა პრობლემას ჭრის და რა
ფუნქციონალს სთავაზობს მომხმარებელს.]
---
## გუნდის წევრები და როლების გადანაწილება
* **გუნდის ნომერი:** [მაგ: გუნდი №3]
* **სტუდენტი 1 (ლიდერი):** [ნიკოლოზ იმერლიშვილი] — *ლიდერილი:* [ონლაინ ტესტები და ქვიზები]

* **სტუდენტი 2:** [ნიკა ყუფუნია] — *დამხმარე:* [კურსების კატალოგი]

## ტექნოლოგიური სტეკი (Tech Stack)
* **Core:** React (Vite), TypeScript
* **Styling:** Tailwind CSS, Sass/SCSS
* **State Management &amp; Routing:** Redux Toolkit / Context API, React Router v6
* **Forms &amp; Validation:** Formik, Yup / Zod
* **Data Fetching &amp; API:** Fetch API / Axios (სატესტო მონაცემები: GitHub Raw JSON /
MockAPI)
* **Tools &amp; Performance:** Git, GitHub Actions, Lighthouse, Chrome DevTools
---
## პროექტის ლოკალურად გაშვების ინსტრუქცია

1. **რეპოზიტორიის კლონირება:**
```bash
git clone [https://github.com/Nikaiyioti/nikotriko.git]
cd nikotriko
```
2. **დამოკიდებულებების (Dependencies) ინსტალაცია:**
```bash
npm install
```
3. **პროექტის გაშვება დეველოპმენტ რეჟიმში:**
```bash
npm run dev
```
4. **პროექტის დაქოქვა პროდაქშენისთვის (Build):**
```bash
npm run build

```
---
## მნიშვნელოვანი ბმულები და მტკიცებულებები
* **Live Demo (ონლაინ ვერსია):** [(https://nikotriko.vercel.app/)]
* **GitHub Repository:** [(https://github.com/Nikaiyioti/nikotriko.git)]
* **ჩემი ინდივიდუალური Branch:** [mamiko]
* **ბოლო Commit-ის ჰეში (Hash):** [b8d920706b8fb789d4c43d3c72060d725664e602]
4. Git/GitHub სამუშაო პროცესი (Workflow) გუნდებისთვის:
o Repository-ს შექმნა: გუნდის ლიდერი ქმნის რეპოზიტორიას GitHub-ზე
და იწვევს წევრებს.
o შტოები (Branches): main შტოში პირდაპირი Push იკრძალება. თითოეული
სტუდენტი მუშაობს პირად შტოზე (feature/*).
o ინტეგრაცია (Pull Request): კოდის Push-ის შემდეგ იხსნება Pull Request
main-ის მიმართულებით, მოწმდება კონფლიქტები და ხდება Merge.
საბოლოო ვერსია: git pull origin main-ის შემდეგ კეთდება build (npm run
build) და ინახება 02_integrated_project საქაღალდეში.
