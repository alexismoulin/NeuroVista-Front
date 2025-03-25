export const SERVER_URL = "http://127.0.0.1:5001";
const defaultPatient = "Alexis";
const defaultStudy = "ST1";

// Helper function to fetch data from an endpoint
async function fetchDataFromEndpoint(endpoint, serverUrl) {
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

// Fetch cortical data
async function fetchCortical(serverUrl, patient=defaultPatient, study=defaultStudy) {
    return fetchDataFromEndpoint(`/cortical/${patient}/${study}`, serverUrl);
}

// Fetch subcortical data
async function fetchSubcortical(serverUrl, patient=defaultPatient, study=defaultStudy) {
    return fetchDataFromEndpoint(`/subcortical/${patient}/${study}`, serverUrl);
}

// Fetch subcortical data
async function fetchGeneral(serverUrl, patient=defaultPatient, study=defaultStudy) {
    return fetchDataFromEndpoint(`/general/${patient}/${study}`, serverUrl);
}

// Fetch the series data
export async function getSeries(serverUrl, patient=defaultPatient, study=defaultStudy) {
    return fetchDataFromEndpoint(`/series/${patient}/${study}`, serverUrl);
}

// Initialize data for a given series
export async function initializeData(series) {
    try {
        const corticalData = await fetchCortical(SERVER_URL);
        const subcorticalData = await fetchSubcortical(SERVER_URL);
        const generalData = await fetchGeneral(SERVER_URL);

        // Validate responses
        if (!corticalData) {
            throw new Error("Failed to load cortical data.");
        }
        if (!subcorticalData) {
            throw new Error("Failed to load subcortical data.");
        }
        if (!generalData) {
            throw new Error("Failed to load general data.");
        }

        const cortical = corticalData[series] || {};
        const subcortical = subcorticalData[series] || {};
        const general = generalData[series] || {};

        if (!Object.keys(cortical).length || !Object.keys(subcortical).length || !Object.keys(general).length) {
            throw new Error(`No data found for series: ${series}`);
        }

        return {
            aseg: {
                data: general.aseg || [],
                title: "General Segmentations",
                headers: ["Structure", "Volume (mm3)", "Analysis"],
            },
            lesions: {
                data: general.lesions || [],
                title: "Hypointensities",
                headers: ["Structure", "Volume (mm3)", "Analysis"],
            },
            brain: {
                data: cortical.brain || [],
                title: "General Volumes",
                headers: ["Structure", "Volume (mm3)", "Analysis"],
            },
            whiteMatter: {
                data: cortical.whitematter || [],
                title: "White Matter",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"],
            },
            lhsParcellation: {
                data: cortical.lh_dkatlas || [],
                title: "LHS Parcellations",
                headers: [
                    "Structure",
                    "Surface Area (mm2)",
                    "Gray Matter Vol (mm3)",
                    "Thickness Avg (mm)",
                    "Mean Curvature (mm-1)",
                    "Analysis",
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
                    "Mean Curvature (mm-1)",
                    "Analysis",
                ],
            },
            hippocampus: {
                data: subcortical.hippocampus || [],
                title: "Hippocampus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"],
            },
            thalamus: {
                data: subcortical.thalamus || [],
                title: "Thalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"],
            },
            amygdala: {
                data: subcortical.amygdala || [],
                title: "Amygdala",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"],
            },
            brainStem: {
                data: subcortical.brain_stem || [],
                title: "Brain Stem",
                headers: ["Structure", "Volume (mm3)", "Analysis"],
            },
            hypothalamus: {
                data: subcortical.hypothalamus || [],
                title: "Hypothalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"],
            }
        };
    } catch (error) {
        console.error("Error initializing data:", error.message);
        return null;
    }
}