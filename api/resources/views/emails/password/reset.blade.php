@component('mail::message')
# Reset your password

Hi {{ $content['name'] }}!

Please click the link below to reset your password.

@component('mail::button', ['url' => $content['url'], 'color' => 'blue'])
Reset your password!
@endcomponent

If you have not requested a new password, please ignore this email.

Hope to see your soon,<br>
{{ config('app.name') }} team
@endcomponent
