const { generateImage } = require("./services/quote.service");
// const { uploadImage } = require("./services/insta.service");


(async () => {
    // 1. generate Image
    await generateImage();

    // 2. Upload to Instagram
    // await uploadImage();
})();