import { env } from "~/env.mjs"


const requestOptions = (imageUrl: string) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Key ${env.CLARIFAI_TOKEN}`,
    },
    body: JSON.stringify({
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    }),
  };
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


export default requestOptions