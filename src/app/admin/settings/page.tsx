import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
       <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Manage your site settings here. This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Functionality for changing the site logo and other settings will be added soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
