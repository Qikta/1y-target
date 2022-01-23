// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCanvas, loadImage, registerFont } from 'canvas';
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'
import path from 'path';
import { removeBucketPath } from '../../utils/supabaseStorage';

export interface ICreateOgpResponse {
  ogp_url?: string
  debugMessage: string
}


const createOgp = async (
    req: NextApiRequest,
    res: NextApiResponse<ICreateOgpResponse>
  ): Promise<void> => {
    const { title, user_name } = req.body;
    const WIDTH = 1200 as const;
    const HEIGHT = 630 as const;
    const DX = 0 as const;
    const DY = 0 as const;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const backgroundImage = await loadImage(path.resolve("./public/background_ogp.png"));
    ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);
    // registerFont(path.resolve("./fonts/NotoSansJP-Regular.otf"), {
    //   family: "Noto",
    // });
    // ctx.fillStyle = "#FFF";
    // ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.font = "60px ipagp";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const text = String(title)
    ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
    const buffer = canvas.toBuffer();
    const { data: inputData, error } = await supabase.storage
        .from('ogp-img')
        .upload(`opg/${title}-${user_name}.png`, buffer, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false
    })
    if (error) { throw error }
    
    const key = inputData?.Key
    if (!key) { throw new Error('storage key is undefined')}

    const { data, error: err } = await supabase.storage.from('ogp-img').getPublicUrl(removeBucketPath(key, "ogp-img"))
    if (err) { throw err }

    if (data) {
      const body: ICreateOgpResponse = {
        ogp_url: data.publicURL,
        debugMessage: 'get ogp url'
      }
      res.status(200).json(body)
    } else {
      res.status(400).json({ debugMessage: `ogp url not found`})
    }
  }
  
  export default createOgp;
