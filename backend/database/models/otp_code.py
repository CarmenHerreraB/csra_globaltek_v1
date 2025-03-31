from django.db import models

# Create your models here.

class OTPCode(models.Model):
    otp_code = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'OTP generado el {self.created_at}'