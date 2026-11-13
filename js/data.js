/* Presentations & documents shown on the site.
   Slide images live in assets/slides/<id>/001.jpg … (thumbnails: t001.jpg)
   To add a new one: export its slides to images, drop them in a new folder,
   put the original file in /files and add an entry here. */
window.DECKS = [
  {
    id: "smart-green-hplc",
    kind: "Lecture",
    group: "teaching",
    title: "Smart & Green HPLC Analysis",
    subtitle: "The Balance Between AI Assistance and Human Expertise",
    summary: "A reversed-phase HPLC method-development lecture showing how AI can accelerate green analytical chemistry — and why the human scientist must still audit every answer.",
    description: [
      "This lecture walks students through developing a reversed-phase HPLC method for a paracetamol–dexketoprofen pair, using a free AI chatbot as a digital accelerator for literature screening and for proposing an eco-friendly mobile phase based on ethanol and formic acid.",
      "It then stages a critical human audit: the AI predicts the wrong elution order, and students catch the error by returning to first principles — on a non-polar C18 column, the more polar drug elutes first. The session closes in the wet lab, where a published method is applied and optimised by hand, and links the whole exercise to an ISO 9001 quality mindset and the UN Sustainable Development Goals."
    ],
    points: [
      "Core principle of reversed-phase HPLC and polarity-driven elution order",
      "Using AI chatbots for fast literature search and green solvent selection",
      "Spotting an AI hallucination with a textbook audit",
      "Wet-lab application and human optimisation of a published method",
      "An academic and quality blueprint for the pharmacy graduate of the future"
    ],
    tags: ["HPLC", "Green Chemistry", "AI in Education", "Quality Mindset"],
    n: 14, start: 1, w: 1600, h: 900, unit: "slides",
    file: "files/Smart-Green-HPLC_Samar-Abu-Khashaba.pptx", fileType: "PPTX"
  },
  {
    id: "phd-defense",
    kind: "Doctoral Defense",
    group: "research",
    title: "Different Analytical Methods for Determination of Selected Drugs Containing Nitrogen and/or Sulphur Atom",
    subtitle: "PhD thesis defense — Faculty of Pharmacy, Alexandria University",
    summary: "The doctoral defense: a first-of-its-kind voltammetric method and a novel green HPLC-DAD method, both validated and published in international journals.",
    description: [
      "The defense presents two original, sustainability-driven analytical methods. The first is a differential-pulse voltammetric method on a simple, unmodified glassy carbon electrode for the simultaneous determination of paracetamol in two binary mixtures — with aceclofenac or with dicyclomine — without prior separation or electrode modification. The work, published in Scientific Reports, was validated to ICH guidelines and aligned with 13 UN Sustainable Development Goals.",
      "The second is the first eco-friendly HPLC-DAD method for the concurrent quantification of colchicine and dexamethasone, in laboratory-made combinations and in rat plasma, published in BMC Chemistry. Both drugs are resolved in under five minutes, with validation according to ICH and FDA guidelines and a full greenness, blueness and whiteness assessment.",
      "Supervised by Prof. Dr. Mohammed Abdel-Tawab Korany, Prof. Dr. Marwa Adel Abdel-Latif Ragab, Dr. Sara Ismail Abdelaziz Aborass and Dr. Aya Refaat Abdel-Hamed Ahmed."
    ],
    points: [
      "Voltammetric determination of paracetamol with aceclofenac or dicyclomine",
      "pH-dependent oxidation mechanisms at the glassy carbon electrode",
      "HPLC-DAD determination of colchicine and dexamethasone in plasma",
      "Method validation under ICH and FDA guidelines",
      "Greenness and sustainability assessment, NQS index and UN SDG alignment"
    ],
    tags: ["Voltammetry", "HPLC-DAD", "Method Validation", "Sustainability"],
    n: 95, start: 2, w: 1600, h: 900, unit: "slides",
    file: "files/PhD-Defense_Samar-Abu-Khashaba.pptx", fileType: "PPTX"
  },
  {
    id: "review-article",
    kind: "Review Article",
    group: "research",
    title: "Derivative Peaks Convolution with Discrete Fourier Functions in Analytical Chemistry",
    subtitle: "A comprehensive review for data processing, applications and green analytical chemistry aspects",
    summary: "How derivative techniques, Fourier-function convolution and non-parametric regression combine to rescue overlapped, noisy analytical signals — sustainably.",
    description: [
      "This presentation reviews the theoretical framework behind derivative methods, discrete Fourier-function convolution and non-parametric regression, and shows how they integrate mathematically to filter noise, correct baselines and resolve overlapping peaks.",
      "It surveys applications across UV and atomic spectroscopy, spectrofluorimetry, HPLC, HPTLC, capillary electrophoresis and voltammetry, then evaluates the approach as a green analytical technology using the Eco-Scale, AGREE, BAGI and RGB 12 tools, the NQS index and the UN Sustainable Development Goals."
    ],
    points: [
      "Derivative techniques: strengths and limitations",
      "Eight-point Fourier functions and convolution of derivative signals",
      "Theil's non-parametric regression versus least squares",
      "Applications in spectroscopy, separation science and electrochemistry",
      "Greenness, blueness and whiteness assessment of chemometric methods"
    ],
    tags: ["Chemometrics", "Fourier Functions", "Green Analytical Chemistry"],
    n: 73, start: 2, w: 1600, h: 900, unit: "slides",
    file: "files/Review-Article-Fourier-Convolution_Samar-Abu-Khashaba.pptx", fileType: "PPTX"
  },
  {
    id: "analytical-chemistry-lab",
    kind: "Lab Teaching",
    group: "teaching",
    title: "Analytical Chemistry Lab 1–2",
    subtitle: "Foundations of titrimetric analysis",
    summary: "An illustrated introduction to volumetric analysis: reactions, glassware, indicators, standard solutions and the standardisation of hydrochloric acid.",
    description: [
      "A practical teaching deck that introduces first-year pharmacy students to titrimetric analysis. It covers the types of reactions used, the requirements of a valid titration, essential terminology and the tools of the laboratory bench.",
      "Step-by-step visuals follow an acid–base titration to its end point with phenolphthalein and methyl orange, before moving on to the preparation of standard solutions and the standardisation of 0.1 N HCl against 0.1 N NaOH."
    ],
    points: [
      "Classification of analytical chemistry and titrimetric reactions",
      "Titrant, standard solution, equivalence point and end point",
      "Neutralisation indicators and their colour changes",
      "Preparing and standardising solutions, with worked calculations"
    ],
    tags: ["Titrimetry", "Laboratory Skills", "Undergraduate"],
    n: 15, start: 1, w: 1600, h: 900, unit: "slides",
    file: "files/Analytical-Chemistry-Lab-1-2_Samar-Abu-Khashaba.pptx", fileType: "PPTX"
  },
  {
    id: "revision-notes",
    kind: "Lab Teaching",
    group: "teaching",
    title: "Revision Notes — Analytical Chemistry",
    subtitle: "Practical exam preparation for Clinical Pharmacy students",
    summary: "A visual revision session ahead of the practical exam: marking scheme, OSPE format, lab rules and the determination of a mixture of two acids.",
    description: [
      "A revision session designed to send students into their practical examination calm and prepared. It explains how lab marks are distributed, what to expect in the OSPE, and the rules of the laboratory.",
      "The deck then revisits the determination of a mixture of two monoprotic acids (HCl / CH₃COOH) and ends with a practical checklist — from washing tools and choosing indicators to repeating the experiment and averaging results."
    ],
    points: [
      "Lab marks and OSPE structure",
      "Laboratory rules and regulations",
      "Determination of a mixture of two monoprotic acids",
      "A step-by-step exam-day checklist"
    ],
    tags: ["Revision", "OSPE", "Clinical Pharmacy"],
    n: 17, start: 1, w: 1600, h: 1200, unit: "slides",
    file: "files/Revision-Notes-Analytical-Chemistry_Samar-Abu-Khashaba.pptx", fileType: "PPTX"
  },
  {
    id: "medication-error-report",
    kind: "Quality Report",
    group: "quality",
    title: "Determination of Medication Administration Error and Promote Patient Satisfaction",
    subtitle: "Comprehensive report — Master of Quality Management, 2022",
    summary: "A Six Sigma case study that traces medication administration errors in a multi-specialty hospital back to their root cause.",
    description: [
      "This comprehensive report investigates the causes of medication errors in a multi-specialty hospital, auditing incident reports retrospectively and applying quality-improvement tools — process maps, brainstorming, Pareto charts, cause-and-effect diagrams and failure mode and effect analysis.",
      "Medication administration errors accounted for the largest share of all causes (52%), and the Pareto analysis showed that missed doses made up the majority of them (60.4%). Using Six Sigma, the root cause was traced to missed doses during rush hour, leading to recommendations for sustained quality-improvement programmes."
    ],
    points: [
      "Healthcare quality management and clinical governance",
      "Process mapping of the medication-use cycle",
      "Pareto, fishbone and FMEA analysis of incident data",
      "Six Sigma root-cause determination and recommendations"
    ],
    tags: ["Six Sigma", "Patient Safety", "Healthcare Quality"],
    n: 39, start: 1, w: 1400, h: 1981, unit: "pages",
    file: "files/Medication-Administration-Error-Report_Samar-Abu-Khashaba.pdf", fileType: "PDF"
  },
  {
    id: "synchronous-fluorescence",
    kind: "Scientific Essay",
    group: "research",
    title: "Synchronous Fluorescence Spectroscopy",
    subtitle: "Principles and analytical applications",
    summary: "A referenced essay on synchronous fluorescence — how scanning excitation and emission together sharpens spectra and resolves mixtures without separation.",
    description: [
      "Fluorescence is among the most sensitive tools in analytical chemistry, yet conventional emission spectra of mixtures are often broad and featureless. This essay explains how synchronous fluorescence spectroscopy — scanning excitation and emission wavelengths simultaneously — narrows spectral bands and simplifies complex spectra.",
      "It reviews the underlying theory, the main synchronous scanning modes and their use in the analysis of pharmaceutical mixtures without prior separation."
    ],
    points: [
      "Photoluminescence, fluorescence and phosphorescence",
      "Principle of synchronous scanning",
      "Spectral narrowing and improved selectivity",
      "Applications to multi-component analysis"
    ],
    tags: ["Spectrofluorimetry", "Spectroscopy", "Literature Review"],
    n: 31, start: 1, w: 1400, h: 1980, unit: "pages",
    file: "files/Synchronous-Fluorescence-Spectroscopy_Samar-Abu-Khashaba.pdf", fileType: "PDF"
  }
];

window.deckSlides = function (d) {
  var out = [];
  for (var i = d.start; i <= d.n; i++) {
    var s = ("00" + i).slice(-3);
    out.push({ full: "assets/slides/" + d.id + "/" + s + ".jpg", thumb: "assets/slides/" + d.id + "/t" + s + ".jpg" });
  }
  return out;
};
