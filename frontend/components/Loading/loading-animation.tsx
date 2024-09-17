import { Transition } from '@headlessui/react';

export default function LoadingAnimation({
  showLoading,
  isRelative = false,
  className = ''
}: {
  showLoading: boolean;
  isRelative?: boolean;
  className?: string;
}) {
  return (
    <Transition as="div" show={showLoading} className={className}>
      <div
        className={`${
          isRelative ? 'relative' : 'absolute z-50'
        } inset-0 flex items-center justify-center bg-white bg-opacity-10 rounded-md h-full w-full`}
      >
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    </Transition>
  );
}