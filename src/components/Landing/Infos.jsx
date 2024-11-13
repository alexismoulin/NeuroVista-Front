export default function Infos() {
    return (
        <section className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="ml-8">
                    <h3 className="text-2xl font-bold text-white mb-4">What is NeuroVista?</h3>
                    <p className="text-stone-50 leading-relaxed font-merriweather text-lg">
                        NeuroVista is an open source web-based application for the analysis and visualization of
                        structural, functional, and diffusion neuroimaging data from cross-sectional and longitudinal studies.
                    </p>
                </div>
                <div className="mr-8">
                    <h3 className="text-2xl font-bold text-white mb-4">What does it include?</h3>
                    <p className="text-stone-50 leading-relaxed font-merriweather text-lg">
                        A full processing stream for MR imaging data that involves skull-stripping,
                        bias field correction, registration, and anatomical segmentation as well as
                        cortical surface reconstruction, registration, and parcellation.
                    </p>
                    <p className="text-stone-50 leading-relaxed mt-4 font-merriweather text-lg">
                        NeuroVista also includes fMRI and diffusion tractography toolboxes,
                        a robust visualization interface, utilities for statistical group analysis,
                        and much more...
                    </p>
                </div>
            </div>
        </section>
    )
}