const SERVER_URL = "http://127.0.0.1:5001"

export async function fetchCortical(serverUrl) {
    const response = await fetch(`${serverUrl}/cortical`);
    return await response.json();
}

export async function fetchSubcortical(serverUrl) {
    const response = await fetch(`${serverUrl}/subcortical`);
    return await response.json();
}

export async function initializeData() {

    try {

        const cortical = await fetchCortical(SERVER_URL);
        const subcortical = await fetchSubcortical(SERVER_URL);

        return {
            aseg: {
                data: cortical.aseg,
                title: "General Segmentations",
                headers: ["Structure", "Volume (mm3)", "Analysis"]
            },
            brain: {
                data: cortical.brain,
                title: "General Volumes",
                headers: ["Structure", "Volume (mm3)", "Analysis"]
            },
            whiteMatter: {
                data: cortical.whitematter,
                title: "White Matter",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
            },
            lhsParcellation: {
                data: cortical.lh_dkatlas,
                title: "LHS Parcellations",
                headers: [
                    "Structure", "Surface Area (mm2)", "Gray Matter Vol (mm3)", "Thickness Avg (mm)", "Mean Curvature (mm-1)", "Analysis"
                ]
            },
            rhsParcellation: {
                data: cortical.rh_dkatlas,
                title: "RHS Parcellations",
                headers: [
                    "Structure", "Surface Area (mm2)", "Gray Matter Vol (mm3)", "Thickness Avg (mm)", "Mean Curvature (mm-1)", "Analysis"
                ]
            },
            hippocampus: {
                data: subcortical.hippocampus,
                title: "Hippocampus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
            },
            thalamus: {
                data: subcortical.thalamus,
                title: "Thalamus",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
            },
            amygdala: {
                data: subcortical.amygdala,
                title: "Amygdala",
                headers: ["Structure", "LHS Volume (mm3)", "RHS Volume (mm3)", "Analysis"]
            },
            brainStem: {
                data: subcortical.brain_stem,
                title: "Brain Stem",
                headers: ["Structure", "Volume (mm3)", "Analysis"]
            },
            hypothalamus: {
                data: subcortical.hypothalamus,
                title: "Hypothalamus",
                headers: ["Structure", "Volume (mm3)", "Analysis"]
            },
            cerebellum: {
                data: subcortical.cerebellum,
                title: "Cerebellum",
                headers: ["Structure", "Volume (mm3)", "Analysis"]
            }
        };
    } catch (error) {
        console.error("Error initializing data:", error.message);
        return null;
    }
}