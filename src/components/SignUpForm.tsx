// 'use client';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useState } from 'react';

// interface SignUpFormValues {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   terms: boolean;
// }

// const SignUpForm = () => {
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   const formik = useFormik<SignUpFormValues>({
//     initialValues: {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       terms: false,
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Name is required'),
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password')], 'Passwords must match')
//         .required('Confirm your password'),
//       terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         // 🔁 Replace with your API endpoint
//         const response = await fetch('/api/signup', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(values),
//         });

//         if (response.ok) {
//           setSuccessMessage('Signup successful!');
//           resetForm();
//         } else {
//           setSuccessMessage('Something went wrong. Try again.');
//         }
//       } catch (error) {
//         setSuccessMessage('Server error. Try again.');
//       }
//     },
//   });

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
//       <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

//       <form onSubmit={formik.handleSubmit}>
//         {/* Name */}
//         <div className="mb-4">
//           <label htmlFor="name" className="block font-medium mb-1">Name</label>
//           <input
//             id="name"
//             type="text"
//             {...formik.getFieldProps('name')}
//             className="w-full border border-gray-300 rounded p-2"
//           />
//           {formik.touched.name && formik.errors.name && (
//             <p className="text-red-600 text-sm">{formik.errors.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label htmlFor="email" className="block font-medium mb-1">Email</label>
//           <input
//             id="email"
//             type="email"
//             {...formik.getFieldProps('email')}
//             className="w-full border border-gray-300 rounded p-2"
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className="text-red-600 text-sm">{formik.errors.email}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label htmlFor="password" className="block font-medium mb-1">Password</label>
//           <input
//             id="password"
//             type="password"
//             {...formik.getFieldProps('password')}
//             className="w-full border border-gray-300 rounded p-2"
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-600 text-sm">{formik.errors.password}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-4">
//           <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirm Password</label>
//           <input
//             id="confirmPassword"
//             type="password"
//             {...formik.getFieldProps('confirmPassword')}
//             className="w-full border border-gray-300 rounded p-2"
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <p className="text-red-600 text-sm">{formik.errors.confirmPassword}</p>
//           )}
//         </div>

//         {/* Terms Checkbox */}
//         <div className="mb-4 flex items-center">
//           <input
//             id="terms"
//             type="checkbox"
//             {...formik.getFieldProps('terms')}
//             className="mr-2"
//           />
//           <label htmlFor="terms" className="text-sm">
//             I accept the <a href="#" className="text-blue-600 underline">terms and conditions</a>
//           </label>
//         </div>
//         {formik.touched.terms && formik.errors.terms && (
//           <p className="text-red-600 text-sm mb-4">{formik.errors.terms}</p>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
//         >
//           Sign Up
//         </button>

//         {/* Success Message */}
//         {successMessage && (
//           <p className="text-green-600 text-center mt-4">{successMessage}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;
