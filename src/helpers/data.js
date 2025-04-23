// noinspection JSUnresolvedVariable

export const SERVER_URL = "http://127.0.0.1:5001";
const defaultPatient = "Alexis";
const defaultStudy = "ST1";

/**
 * Helper function to fetch data from an endpoint.
 *
 * @param {string} endpoint - The API endpoint path.
 * @param {string} serverUrl - The base server URL.
 * @returns {Promise<Object|null>} - The parsed JSON data or null if an error occurs.
 */
async function fetchDataFromEndpoint(endpoint, serverUrl = SERVER_URL) {
    try {
        const response = await fetch(`${serverUrl}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.error(`Failed to fetch ${endpoint}: ${response.statusText}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        return null;
    }
}

/**
 * Helper function to build endpoint URLs.
 *
 * @param {string} base - The base endpoint (e.g., "cortical", "general").
 * @param {string} patient - The patient identifier.
 * @param {string} study - The study identifier.
 * @returns {string} - The constructed endpoint.
 */
function buildEndpoint(base, patient = defaultPatient, study = defaultStudy) {
    return `/${base}/${patient}/${study}`;
}

export async function getSeries(serverUrl = SERVER_URL, patient = defaultPatient, study = defaultStudy) {
    return fetchDataFromEndpoint(buildEndpoint("series", patient, study), serverUrl);
}

async function fetchCortical(serverUrl = SERVER_URL, patient = defaultPatient, study = defaultStudy) {
    return fetchDataFromEndpoint(buildEndpoint("cortical", patient, study), serverUrl);
}

async function fetchSubcortical(serverUrl = SERVER_URL, patient = defaultPatient, study = defaultStudy) {
    return fetchDataFromEndpoint(buildEndpoint("subcortical", patient, study), serverUrl);
}

async function fetchGeneral(serverUrl = SERVER_URL, patient = defaultPatient, study = defaultStudy) {
    return fetchDataFromEndpoint(buildEndpoint("general", patient, study), serverUrl);
}

/**
 * Initialize data for a given series.
 * @param {string} series
 * @returns {Promise<Object|null>}
 */
export async function initializeData(series) {
    try {
        // Fetch data concurrently
        const [corticalData, subcorticalData, generalData] = await Promise.all([
            fetchCortical(),
            fetchSubcortical(),
            fetchGeneral(),
        ]);

        // Validate responses
        if (!corticalData || !subcorticalData || !generalData) {
            console.error("Failed to load one or more datasets.");
            return null;
        }

        const cortical = corticalData[series] || {};
        const subcortical = subcorticalData[series] || {};
        const general = generalData[series] || {};

        if (!Object.keys(cortical).length || !Object.keys(subcortical).length || !Object.keys(general).length) {
            console.error(`No data found for series: ${series}`);
            return null;
        }

        return {
            aseg: {
                data: general.aseg || [],
                title: "General Segmentations",
                headers: ["Structure", "Volume (mm3)"],
            },
            lesions: {
                data: general.lesions || [],
                title: "Hypointensities",
                headers: ["Structure", "Volume (mm3)"],
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
            },
            lhsParcellation: {
                data: cortical.lh_dkatlas || [],
                title: "LHS Parcellations",
                headers: [
                    "Structure",
                    "Surface Area (mm2)",
                    "Gray Matter Vol (mm3)",
                    "Thickness Avg (mm)",
                    "Mean Curvature (mm-1)"
                ],
            },
            rhsParcellation: {
                data: cortical.rh_dkatlas || [],
                title: "RHS Parcellations",
                headers: [
                    "Structure",
                    "Surface Area (mm2)",
                    "Gray Matter Vol (mm3)",
                    "Thickness Avg (mm)",
                    "Mean Curvature (mm-1)"
                ],
            },
            hippocampus: {
                data: subcortical.hippocampus || [],
                title: "Hippocampus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"],
            },
            thalamus: {
                data: subcortical.thalamus || [],
                title: "Thalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"]
            },
            amygdala: {
                data: subcortical.amygdala || [],
                title: "Amygdala",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"]
            },
            brainStem: {
                data: subcortical.brain_stem || [],
                title: "Brain Stem",
                headers: ["Structure", "Volume (mm3)"]
            },
            hypothalamus: {
                data: subcortical.hypothalamus || [],
                title: "Hypothalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)"]
            }
        };
    } catch (error) {
        console.error("Error initializing data:", error.message);
        return null;
    }
}