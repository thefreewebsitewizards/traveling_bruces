# Admin Panel Instructions

## How to Access the Admin Panel

1. **Enable Admin Mode**: Add `?admin=true` to the end of your website URL
   - Example: `http://localhost:3000/?admin=true` or `https://yourwebsite.com/?admin=true`

2. **Admin Button**: Once admin mode is enabled, you'll see a blue "Edit Stats" button in the bottom-right corner of the page

3. **Open Admin Panel**: Click the "Edit Stats" button to open the statistics editor
   - **Password Required**: You will be prompted to enter the admin password
   - Enter the correct password to access the admin panel
   - If the password is incorrect, access will be denied

## Editing Statistics

The admin panel allows you to edit multiple types of statistics:

### Journey Stats (About Section)
- **States Visited**: Number of states you've traveled to
- **Journey Started**: Year you started your RV journey
- **Fifth Wheel Size**: Size of your RV (e.g., "40ft")

### Analytics (Analytics Section)
- **Average Followers**: Your average follower count across platforms
- **Average Reach**: Average reach of your content
- **Average Impressions**: Average impressions your content receives
- **Engagement Rate (%)**: Your engagement rate percentage

### Gender Distribution
- **Female Percentage**: Percentage of female audience (0-100)
- **Male Percentage**: Percentage of male audience (0-100)

### Age Distribution
- **18-24 Age Group**: Percentage of audience aged 18-24 (0-100)
- **25-34 Age Group**: Percentage of audience aged 25-34 (0-100)
- **35-44 Age Group**: Percentage of audience aged 35-44 (0-100)

## How to Update

1. Click the "Edit Stats" button to open the admin panel
2. Modify the numbers in the input fields
3. Click "Update Statistics" to save your changes
4. The page will automatically update with your new numbers
5. Your changes are saved locally and will persist between visits

## Important Notes

- Changes are saved in your browser's local storage
- The admin panel is only visible when `?admin=true` is in the URL
- Analytics numbers will animate when the page loads or when updated
- Journey stats update immediately without animation
- You can update these statistics monthly or as needed

## Security

- The admin panel is hidden by default
- Only users who know to add `?admin=true` to the URL can access it
- No sensitive data is exposed through this system
- All changes are stored locally in the browser

## Troubleshooting

- If the admin button doesn't appear, make sure `?admin=true` is in your URL
- If changes don't save, check that your browser allows local storage
- Refresh the page if the admin panel doesn't respond properly