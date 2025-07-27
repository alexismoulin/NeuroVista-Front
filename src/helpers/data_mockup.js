export const SERVER_URL = import.meta.env.MOCKUP;
const defaultPatient = "Alexis";
const defaultStudy = "ST1";

/**
 * Generic fetcher for JSON files under public/mockup/{patient}/{study}/JSON/.
 */
async function fetchMockup(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} @ ${url}`);
    const ct = res.headers.get("Content-Type") || "";
    if (!ct.includes("application/json")) {
        throw new Error(`Expected JSON but got '${ct}' @ ${url}`);
    }
    return res.json();
}

function buildMockupPath(patient, study, filename) {
    return `mockup/${patient}/${study}/JSON/${filename}`
}

const FILES = {
    nifti:      "niftiDimensions.json",
    cortical:   "cortical.json",
    subcortical:"subcortical.json",
    general:    "general.json",
};

const makeFetcher = key => async (
    patient = defaultPatient,
    study   = defaultStudy
) => fetchMockup(
    buildMockupPath(patient, study, FILES[key])
);

export const getSeries      = makeFetcher("nifti");
export const fetchCortical    = makeFetcher("cortical");
export const fetchSubcortical = makeFetcher("subcortical");
export const fetchGeneral     = makeFetcher("general");


export async function initializeData(
    series,
    patient = defaultPatient,
    study   = defaultStudy
) {
    try {
        const [cData, sData, gData] = await Promise.all([
            fetchCortical(patient, study),
            fetchSubcortical(patient, study),
            fetchGeneral(patient, study),
        ]);

        for (const [name, data] of [
            ["cortical", cData],
            ["subcortical", sData],
            ["general", gData],
        ]) {
            if (!(series in data)) {
                console.error(`Series '${series}' missing in ${name}.json`);
                return null;
            }
        }

        const cortical    = cData[series];
        const subcortical = sData[series];
        const general     = gData[series];

        return {
            aseg: {
                data: general.aseg || [],
                title: "General Segmentations",
                headers: ["Structure", "Volume (mm3)"],
                model: "aseg.glb"
            },
            lesions: {
                data: general.lesions || [],
                title: "Hypointensities",
                headers: ["Structure", "Volume (mm3)"],
                model: undefined
            },
            brain: {
                data: cortical.brain || [],
                title: "General Volumes",
                headers: ["Structure", "Volume (mm3)"],
            },
            whiteMatter: {
                data: cortical.whitematter || [],
                title: "White Matter",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"],
                model: "wmparc.glb"
            },
            lhsParcellation: {
                data: cortical.lh_dkatlas || [],
                title: "LHS Parcellations",
                headers: [
                    "Structure", "Surface Area (mm2)",
                    "Gray Matter Vol (mm3)", "Thickness Avg (mm)",
                    "Mean Curvature (mm-1)"
                ],
                model: "aparc.DKTatlas+aseg.glb"
            },
            rhsParcellation: {
                data: cortical.rh_dkatlas || [],
                title: "RHS Parcellations",
                headers: [
                    "Structure", "Surface Area (mm2)",
                    "Gray Matter Vol (mm3)", "Thickness Avg (mm)",
                    "Mean Curvature (mm-1)"
                ],
                model: "aparc.DKTatlas+aseg.glb"
            },
            hippocampus: {
                data: subcortical.hippocampus || [],
                title: "Hippocampus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"],
                model: "hippoAmygLabels.glb"
            },
            thalamus: {
                data: subcortical.thalamus || [],
                title: "Thalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"],
                model: "ThalamicNuclei.glb"
            },
            amygdala: {
                data: subcortical.amygdala || [],
                title: "Amygdala",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"],
                model: "hippoAmygLabels.glb"
            },
            brainStem: {
                data: subcortical.brain_stem || [],
                title: "Brain Stem",
                headers: ["Structure", "Volume (mm3)"],
                model: "brainstemSsLabels.glb"
            },
            hypothalamus: {
                data: subcortical.hypothalamus || [],
                title: "Hypothalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"],
                model: "hypothalamic_subunits_seg.v1.glb"
            },
        };
    } catch (error) {
        console.error("Error initializing data:", error.message);
        return null;
    }
}