export default function Infos() {
    return (
        <section id="infos" className="main">
            <div className="content dark style3">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-12-narrow">
                            <h3>What is NeuroVista?</h3>
                            <p>Neurovista is an open source package for the analysis and visualization of
                                structural, functional, and diffusion neuroimaging data from cross-sectional
                                and longitudinal studies. </p>
                        </div>
                        <div className="col-6 col-12-narrow">
                            <h3>What does it include?</h3>
                            <p>A full processing stream for MR imaging data that involves skull-stripping,
                                bias field correction, registration, and anatomical segmentation as well as
                                cortical surface reconstruction, registration, and parcellation. </p>
                            <p>Neurovista also includes fMRI and diffusion tractography toolboxes,
                                a robust visualization interface, utilities for statistical group analysis,
                                and much more...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}