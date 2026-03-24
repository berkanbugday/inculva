import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

interface ContactLabels {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  optional: string;
  subject: string;
  selectTopic: string;
  salesInquiry: string;
  technicalSupport: string;
  partnership: string;
  enterprisePlan: string;
  other: string;
  message: string;
  messagePlaceholder: string;
  sendMessage: string;
  sending: string;
  successTitle: string;
  successDescription: string;
  errorTitle: string;
  errorDescription: string;
  validationFirstName: string;
  validationLastName: string;
  validationEmail: string;
  validationSubject: string;
  validationMessage: string;
}

interface Props {
  labels: ContactLabels;
}

function createSchema(labels: ContactLabels) {
  return z.object({
    firstName: z.string().min(1, labels.validationFirstName),
    lastName: z.string().min(1, labels.validationLastName),
    email: z.string().email(labels.validationEmail),
    company: z.string().optional(),
    subject: z.string().min(1, labels.validationSubject),
    message: z.string().min(10, labels.validationMessage),
  });
}

type FormData = z.infer<ReturnType<typeof createSchema>>;

const inputBase =
  'w-full px-4 py-3 rounded-xl border bg-white text-gray-900 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none';
const inputNormal = `${inputBase} border-gray-200 focus:border-primary-500`;
const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-500/20`;

export default function ContactForm({ labels }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const schema = createSchema(labels);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      const response = await fetch(import.meta.env.PUBLIC_FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(response.statusText);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-900">{labels.successTitle}</h3>
        <p className="mt-2 text-sm text-green-700">{labels.successDescription}</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-800">{labels.errorTitle}</p>
          <p className="mt-1 text-sm text-red-600">{labels.errorDescription}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.firstName}
          </label>
          <input
            type="text"
            id="first-name"
            autoComplete="given-name"
            className={errors.firstName ? inputError : inputNormal}
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="mt-1.5 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.lastName}
          </label>
          <input
            type="text"
            id="last-name"
            autoComplete="family-name"
            className={errors.lastName ? inputError : inputNormal}
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="mt-1.5 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {labels.email}
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          className={errors.email ? inputError : inputNormal}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          {labels.company} <span className="text-gray-400">({labels.optional})</span>
        </label>
        <input
          type="text"
          id="company"
          autoComplete="organization"
          className={inputNormal}
          {...register('company')}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {labels.subject}
        </label>
        <select
          id="subject"
          className={`${errors.subject ? inputError : inputNormal} ${!errors.subject ? 'text-gray-900' : ''}`}
          defaultValue=""
          {...register('subject')}
        >
          <option value="" disabled>
            {labels.selectTopic}
          </option>
          <option value="sales">{labels.salesInquiry}</option>
          <option value="support">{labels.technicalSupport}</option>
          <option value="partnership">{labels.partnership}</option>
          <option value="enterprise">{labels.enterprisePlan}</option>
          <option value="other">{labels.other}</option>
        </select>
        {errors.subject && (
          <p className="mt-1.5 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {labels.message}
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${errors.message ? inputError : inputNormal} resize-y`}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md px-8 py-4 text-lg gap-2.5 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? labels.sending : labels.sendMessage}
        {status !== 'sending' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </button>
    </form>
  );
}
