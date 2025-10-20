import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

type SettingsCardProps = {
  title: string
  description: string
  children: React.ReactNode
}

function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

type LabeledInputProps = {
  id: string
  label: string
  type?: string
  defaultValue?: string
}

function LabeledInput({ id, label, type, defaultValue }: LabeledInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} defaultValue={defaultValue} />
    </div>
  )
}

type ToggleRowProps = {
  title: string
  description: string
  defaultChecked?: boolean
}

function ToggleRow({ title, description, defaultChecked }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <SettingsCard title="Profile Information" description="Update your account profile information.">
            <div className="grid grid-cols-2 gap-4">
              <LabeledInput id="firstName" label="First name" defaultValue="John" />
              <LabeledInput id="lastName" label="Last name" defaultValue="Doe" />
            </div>
            <LabeledInput id="email" label="Email" type="email" defaultValue="john@example.com" />
            <Button>Save changes</Button>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <SettingsCard title="Notification Preferences" description="Choose what notifications you want to receive.">
            <ToggleRow
              title="Email Notifications"
              description="Receive emails about your account activity."
              defaultChecked
            />
            <ToggleRow
              title="Marketing Emails"
              description="Receive emails about new products and features."
            />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SettingsCard title="Change Password" description="Update your password to keep your account secure.">
            <LabeledInput id="currentPassword" label="Current password" type="password" />
            <LabeledInput id="newPassword" label="New password" type="password" />
            <LabeledInput id="confirmPassword" label="Confirm new password" type="password" />
            <Button>Update password</Button>
          </SettingsCard>

          <SettingsCard title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
            <ToggleRow title="Two-Factor Authentication" description="Secure your account with 2FA." />
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}