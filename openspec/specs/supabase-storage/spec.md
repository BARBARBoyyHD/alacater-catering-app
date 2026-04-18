# Supabase Storage

The Supabase storage capability provides cloud storage for files and images.

## Requirements

### REQ-1: Provider Images Bucket
A Supabase Storage bucket named `provider-images` SHALL exist for storing provider logo and banner images. The bucket SHALL be public.

### REQ-2: Product Images Bucket
A Supabase Storage bucket named `product-images` SHALL exist for storing product photos and meal images. The bucket SHALL be public.

### REQ-3: Document Storage Bucket
A Supabase Storage bucket named `documents` SHALL exist for storing private documents. The bucket SHALL be private.

### REQ-4: Image Upload Validation
Image uploads SHALL validate file type (JPEG, PNG, WebP only) and size (max 5MB per image).
