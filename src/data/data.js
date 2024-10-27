import cortical from './cortical.json';
import subcortical from './subcortical.json';

const aseg = {
    data: cortical.aseg,
    title: "General Segmentations",
    headers: ["Structure", "Volume (mm3)", "Analysis"]
}
const brain = {
    data: cortical.brain,
    title: "General Volumes",
    headers: ["Structure", "Volume (mm3)", "Analysis"]
}
const whiteMatter = {
    data: cortical.whitematter,
    title: "White Matter",
    headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
}
const lhsParcellation = {
    data: cortical.lh_dkatlas,
    title: "LHS Parcellations",
    headers: [
        "Structure", "Surface Area (mm2)", "Gray Matter Vol (mm3)", "Thickness Avg (mm)", "Mean Curvature (mm-1)", "Analysis"
    ]
}
const rhsParcellation = {
    data: cortical.rh_dkatlas,
    title: "RHS Parcellations",
    headers: [
        "Structure", "Surface Area (mm2)", "Gray Matter Vol (mm3)", "Thickness Avg (mm)", "Mean Curvature (mm-1)", "Analysis"
    ]
}

const hippocampus = {
    data: subcortical.hippocampus,
    title: "Hippocampus",
    headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
}
const thalamus = {
    data: subcortical.thalamus,
    title: "Thalamus",
    headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
}
const amygdala = {
    data: subcortical.amygdala,
    title: "Amygdala",
    headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
}
const brainStem = {
    data: subcortical.brain_stem,
    title: "Brain Stem",
    headers: ["Structure", "Volume (mm3)", "Analysis"]
}
const hypothalamus = {
    data: subcortical.hypothalamus,
    title: "Hypothalamus",
    headers: ["Structure", "Volume (mm3)", "Analysis"]
}
const cerebellum = {
    data: subcortical.cerebellum,
    title: "Cerebellum",
    headers: ["Structure", "Volume (mm3)", "Analysis"]
}

export const data = {
    aseg: aseg, brain: brain, whiteMatter: whiteMatter, lhsParcellation: lhsParcellation, rhsParcellation: rhsParcellation,
    hippocampus: hippocampus, thalamus: thalamus, amygdala: amygdala, brainStem: brainStem, hypothalamus: hypothalamus, cerebellum:cerebellum
}
