document.addEventListener('DOMContentLoaded', function() {
    let nes_initialized = false;

    // Initialize the NES canvas
    function initNES() {
        if (!nes_initialized) {
            nes_init('nes-canvas');
            nes_initialized = true;
        }
    }

    // Setup file input handler
    document.getElementById('file-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            // Make sure NES is initialized
            initNES();
            
            // Start the emulation
            const romData = e.target.result;
            nes_boot(romData);

            // Start frame rendering
            window.requestAnimationFrame(onAnimationFrame);
        };
        
        // Read the ROM file as a binary string
        reader.readAsBinaryString(file);
    });

    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('NES Emulator Error:', e.error);
    });
}); 