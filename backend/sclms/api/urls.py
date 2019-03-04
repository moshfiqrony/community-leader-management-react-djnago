from rest_framework.routers import DefaultRouter
from .views import CLViews, CLDetailsViews, AgentViews, CampaignViews, CampaignDetailsViews, AddCampaignDetailsViews, DistrictsViews, LocationViews, DataCollectionViews

router = DefaultRouter()
router.register(r'cl', CLViews, base_name='ClViews')
router.register(r'cldetails', CLDetailsViews, base_name='CLDetailsViews')
router.register(r'agent', AgentViews, base_name='AgentViews')
router.register(r'campaign', CampaignViews, base_name='CampaignViews')
router.register(r'addcampaignDetails', AddCampaignDetailsViews, base_name='AddCampaignDetailsViews')
router.register(r'campaignDetails', CampaignDetailsViews, base_name='CampaignDetailsViews')
router.register(r'districts', DistrictsViews, base_name='DistrictsViews')
router.register(r'location', LocationViews, base_name='LocationViews')
router.register(r'datacollection', DataCollectionViews, base_name='DataCollectionViews')
urlpatterns = router.urls
