from django.contrib import admin
from sclms.models import CL, UserAdmin, Agent, Campaign, CampaignDetails, Districts, LocationChecklist

admin.site.register(CL)
admin.site.register(UserAdmin)
admin.site.register(Agent)
admin.site.register(Campaign)
admin.site.register(CampaignDetails)
admin.site.register(Districts)
admin.site.register(LocationChecklist)
