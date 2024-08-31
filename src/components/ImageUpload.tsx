import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Image, Upload } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

interface ImageUploadProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	name: FieldPath<T>;
}

export const ImageUpload = <T extends FieldValues>({
	form,
	name,
}: ImageUploadProps<T>) => {
	const t = useTranslations('Events.NewEvent.Form');
	const [fileName, setFileName] = useState('');
	const locale = useLocale();

	return (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{t('eventThumbnail')}</FormLabel>
					<FormControl>
						{process.env.NODE_ENV === 'development' ? (
							<Input {...field} />
						) : (
							<CldUploadWidget
								signatureEndpoint="http://localhost:3000/api/sign-cloudinary-params"
								uploadPreset="event-thumbnail"
								options={{
									language: locale,
									text: {
										pl: {
											or: 'lub',
											menu: {
												file: 'Moje pliki',
											},
											crop: {
												title: 'Przcinanie',
												crop_btn: 'Przytnij',
												skip_btn: 'Pomiń',
											},
											local: {
												browse: 'Wybierz plik',
												dd_title_single: 'Przeciągnij i upuść plik tutaj',
												drop_title_single: 'Upuść plik tutaj',
											},
										},
									},
									sources: ['local'],
									multiple: false,
									maxFiles: 1,
									cropping: true,
									croppingAspectRatio: 1.7777777778,
									resourceType: 'image',
									clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
									maxImageFileSize: 10000000,
									fieldName: 'thumbnail',
									styles: {
										palette: {
											window: '#ffffff',
											sourceBg: '#f4f4f5',
											windowBorder: '#90a0b3',
											tabIcon: '#000000',
											inactiveTabIcon: '#555a5f',
											menuIcons: '#555a5f',
											link: '#000000',
											action: '#339933',
											inProgress: '#000000',
											complete: '#339933',
											error: '#cc0000',
											textDark: '#000000',
											textLight: '#fcfffd',
										},
										frame: {
											background: 'rgba(0, 0, 0, 0.8)',
										},
										fonts: {
											default: null,
											'sans-serif': {
												url: null,
												active: true,
											},
										},
									},
								}}
								onSuccess={(result, { widget }) => {
									field.onChange(result?.info?.secure_url);
									setFileName(
										`${result?.info?.original_filename}.${result.info.format}`,
									);
								}}
							>
								{({ open }) => {
									return (
										<Button
											onClick={() => open()}
											variant="outline"
											className="flex gap-1"
										>
											{fileName ? (
												<>
													<Image className="h-4 w-4" />
													{fileName}
												</>
											) : (
												<>
													<Upload className="h-4 w-4" />
													{t('eventThumbnailButton')}
												</>
											)}
										</Button>
									);
								}}
							</CldUploadWidget>
						)}
					</FormControl>
					<FormDescription>
						{process.env.NODE_ENV === 'development'
							? 'This is development default value'
							: t('eventThumbnailDescription')}
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
