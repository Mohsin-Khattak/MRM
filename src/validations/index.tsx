// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';

export const signinFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  password: yup.string().required('req_password').min(8, 'req_pass_short'),
});
export const forgotemailFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
});
export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  // password: yup.string().required('req_pass').min(8, 'weak_pass'),
  // confirm_password: yup
  //   .string()
  //   .required('New Password is required')
  //   .min(8, 'New weak_pass'),
});
export const renewpasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const signupFormValidation = yup.object().shape({
  first_name: yup.string().required('req_first_name'),
  // middle_name: yup.string().required('req_middle_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .string()
    .test('is-ten-digits', 'Phone must be exactly 10 digits', (value: any) => {
      if (!value) return true; // Allow empty values
      return value.length === 10 && !isNaN(value); // Check for 10 digits and numeric characters
    })
    .required('Phone is required'),
  password: yup.string().required('req_password').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_confirm_password')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
  surname: yup.string().required('req_surname'),
  // gender: yup.string().required('req_gender'),
  // country_code: yup.string().required('req_country_code'),
  // house_name: yup.string().required('req_house_name'),
  // first_line_of_address: yup.string().required('req_first_line_of_address'),
  // postal_code: yup.string().required('req_postal_code'),
  // city: yup.string().required('req_city'),
  // cnic: yup.number().min(13, 'invalid_cnic'),
  // dob: yup.string().required('req_dob'),
});
export const signupDetailsFormValidation = yup.object().shape({
  house_name: yup.string().required('req_house_name'),
  first_line_of_address: yup.string().required('req_first_line_of_address'),
  postal_code: yup.string().required('req_postal_code'),
  city: yup.string().required('req_city'),
  // cnic: yup
  // .string()
  // .test(
  //   'is-valid-cnic',
  //   'Invalid CNIC format (e.g., 12345-1234567-1)',
  //   value => {
  //     if (!value) return true; // Allow empty values
  //     return /^[0-9]{5}-[0-9]{7}-[0-9]$/.test(value);
  //   },
  // )
  // .required('Cnic is required'),
  license_number: yup.string().required('License number is required'),
  dob: yup.string().required('req_dob'),
});
export const updatePasswordValidation = yup.object().shape({
  // email: yup.string().email('invalid_email').required('req_email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Weak Password'),
  //   confirm_password: yup
  //     .string()
  //     .required('New Password is required')
  //     .min(8, 'New weak_pass'),
  // });
  confirm_password: yup
    .string()
    .required('New Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match') // Check if it matches 'password'
    .min(8, 'New weak_pass'),
});
// export const updateProfileFormValidation = yup.object().shape({
//   name: yup.string().required('req_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),

//   doc_cat_id: yup.string().required('req_cat'),
//   zip_code: yup.string().required('req_zip_code'),
//   city: yup.string().required('req_city'),
//   state: yup.string().required('req_state'),
//   price: yup.string().required('req_price'),
//   experience: yup.string().required('req_experience'),
// });
// export const updateProfileFormValidation = yup.object().shape({
//   first_name: yup.string().required('req_first_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),
// });

export const addHotelValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  content: yup.string().required('content_required'),
  star_rate: yup.string().required('hotel_rating_required'),
  video: yup.string().required('link_required').url('invalid_link'),
  policy: yup.array().of(
    yup.object().shape({
      title: yup.string().required('policy_title'),
      content: yup.string().required('policy_content'),
    }),
  ),
  banner_image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      }),
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});
export const addRoomValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  // content: yup.string().required('content_required'),
  number: yup.string().required('number_required'),
  price: yup.string().required('price_required'),
  beds: yup.string().required('beds_required'),
  size: yup.string().required('size_required'),
  adults: yup.string().required('adults_required'),
  ican_import_url: yup.string().required('link_required').url('invalid_link'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      }),
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});

export const addPriceHotelValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  old_password: yup.string().required('req_pass').min(8, 'weak_pass'),
  new_password: yup
    .string()
    .required('New Password is required')
    .min(8, 'New weak_pass'),
});
export const updateProfileFormValidation = yup.object().shape({
  first_name: yup.string().required('req_name'),

  phone: yup
    .string()
    .test('is-ten-digits', 'Phone must be exactly 10 digits', (value: any) => {
      if (!value) return true; // Allow empty values
      return value.length === 10 && !isNaN(value); // Check for 10 digits and numeric characters
    })
    .required('Phone is required'),
});
export const updatePasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
