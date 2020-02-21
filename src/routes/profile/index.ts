import * as express from 'express';

// Controllers
import { checkUserAuth } from '../../middlewares/auth';
import { ProfileController } from '../../controllers/ProfileController';
import { validate } from '../auth/authValidations';
import { ProfileSchema } from './ProfileSchema';

const profileRouter = express.Router();

/**
 * Update the specified user's profile
 */
profileRouter.put(
  '/',
  [validate(ProfileSchema.editProfileSchema), checkUserAuth],
  ProfileController.editProfile,
);

export { profileRouter };
