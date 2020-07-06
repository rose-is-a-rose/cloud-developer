import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../util/util';

const router: Router = Router();

// Root Endpoint
// Displays a simple message to the user
router.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
});

/**
 * GET /filteredimage?image_url={{URL}}
 */
router.get('/filteredimage', async (req: Request, res: Response) => {
    let { image_url } = req.query;
    // check image url is valid
    if (!image_url) {
        return res.status(400).send({ message: '`image_url` is required' });
    }
    const filteredpath: string = await filterImageFromURL(image_url);

    res.sendFile(filteredpath);
    // deleteLocalFiles([filteredpath]);
});

export const IndexRouter: Router = router;