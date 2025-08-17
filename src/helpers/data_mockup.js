export const SERVER_URL = import.meta.env.VITE_MOCKUP;
export const DEFAULT_PATIENT = import.meta.env.VITE_DEFAULT_PATIENT;
export const DEFAULT_STUDY = import.meta.env.VITE_DEFAULT_STUDY;

/**
 * Generic fetcher for JSON files under {server}/{patient}/{study}/JSON/.
 */
async function fetchMockup(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} @ ${url}`);
    const ct = (res.headers.get("Content-Type") || "").toLowerCase();
    if (!ct.includes("json")) {
        // Loosen this if your dev server serves JSON as text/plain
        throw new Error(`Expected JSON but got '${ct}' @ ${url}`);
    }
    return res.json();
}

function buildMockupPath(server, patient, study, filename) {
    return `${server}/${patient}/${study}/JSON/${filename}`;
}

const FILES = {
    nifti:       "niftiDimensions.json",
    cortical:    "cortical.json",
    subcortical: "subcortical.json",
    general:     "general.json",
};

/**
 * Return a callable fetcher. This matches how store.jsx calls it:
 *   getSeries(SERVER_URL, DEFAULT_PATIENT, DEFAULT_STUDY)
 */
function makeFetcher(key) {
    return async (
        server = SERVER_URL,
        patient = DEFAULT_PATIENT,
        study = DEFAULT_STUDY
    ) => {
        const url = buildMockupPath(server, patient, study, FILES[key]);
        return fetchMockup(url);
    };
}

export const getSeries        = makeFetcher("nifti");
export const fetchCortical    = makeFetcher("cortical");
export const fetchSubcortical = makeFetcher("subcortical");
export const fetchGeneral     = makeFetcher("general");

export async function initializeData(series) {
    try {
        const [cData, sData, gData] = await Promise.all([
            fetchCortical(SERVER_URL, DEFAULT_PATIENT, DEFAULT_STUDY),
            fetchSubcortical(SERVER_URL, DEFAULT_PATIENT, DEFAULT_STUDY),
            fetchGeneral(SERVER_URL, DEFAULT_PATIENT, DEFAULT_STUDY),
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

export function getModelUrl(server_url, patient, study, series, filename) {
    return `${server_url}/${patient}/${study}/VIEWER/${series}/${filename}`;
}