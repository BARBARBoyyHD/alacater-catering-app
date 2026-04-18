## ADDED Requirements

### Requirement: Provider Images Bucket
A Supabase Storage bucket named `provider-images` SHALL exist for storing provider logo and banner images. The bucket SHALL be public so images can be displayed on the landing page and mobile app.

#### Scenario: Bucket exists and is public
- **WHEN** the `provider-images` bucket is queried
- **THEN** it exists with public access enabled

#### Scenario: Provider uploads logo
- **WHEN** a provider uploads a logo image
- **THEN** the image is stored at `provider-images/{provider-id}/logo.{ext}`

#### Scenario: Public image URL generation
- **WHEN** a provider's logo URL is requested
- **THEN** a public URL is returned that can be embedded in pages

### Requirement: Product Images Bucket
A Supabase Storage bucket named `product-images` SHALL exist for storing product photos and meal images. The bucket SHALL be public.

#### Scenario: Bucket exists and is public
- **WHEN** the `product-images` bucket is queried
- **THEN** it exists with public access enabled

#### Scenario: Provider uploads product photo
- **WHEN** a provider uploads a product photo
- **THEN** the image is stored at `product-images/{product-id}/{image-index}.{ext}`

#### Scenario: Multiple images per product
- **WHEN** a provider uploads multiple images for one product
- **THEN** all images are stored and accessible under the product's folder

### Requirement: Document Storage Bucket
A Supabase Storage bucket named `documents` SHALL exist for storing private documents (order invoices, provider verification docs). The bucket SHALL be private with access restricted to authenticated users.

#### Scenario: Bucket exists and is private
- **WHEN** the `documents` bucket is queried
- **THEN** it exists with public access disabled

#### Scenario: Only owner can access document
- **WHEN** a user attempts to download a document they don't own
- **THEN** access is denied

### Requirement: Image Upload Validation
Image uploads SHALL validate file type (JPEG, PNG, WebP only) and size (max 5MB per image).

#### Scenario: Valid image upload
- **WHEN** a user uploads a JPEG image under 5MB
- **THEN** the upload succeeds

#### Scenario: Invalid file type rejected
- **WHEN** a user uploads a PDF or executable file
- **THEN** the upload is rejected with error "Only JPEG, PNG, and WebP images are allowed"

#### Scenario: Oversized file rejected
- **WHEN** a user uploads an image larger than 5MB
- **THEN** the upload is rejected with error "Image size must be under 5MB"
