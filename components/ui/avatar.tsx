import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt = 'avatar', className, ...props }: AvatarProps) {
  return (
    <div className={cn('inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted', className)} {...props}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="text-sm text-muted-foreground">??</div>
      )}
    </div>
  );
}
