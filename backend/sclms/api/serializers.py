from rest_framework import serializers

from ..models import CL, Agent, Campaign, CampaignDetails, Districts, LocationChecklist


class DistrictsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Districts
        fields = ('id', 'name')


class CLSerializers(serializers.ModelSerializer):
    class Meta:
        model = CL
        fields = ('id', 'phone', 'password', 'profile_pic', 'name', 'address', 'district','bid','bkash','mar_status','empl_status','gender','nid','active',)


class CLSerializers2(serializers.ModelSerializer):
    district = DistrictsSerializers(read_only=True)

    class Meta:
        model = CL
        fields = ('id', 'phone', 'password', 'profile_pic', 'name', 'address', 'district','bid','bkash','mar_status','empl_status','gender','nid','active',)


class AgentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ('id', 'phone', 'password', 'name', 'profile_pic', 'address', 'district', 'asign', 'active','bid','bkash','mar_status','empl_status','gender','nid',)


class AgentSerializers2(serializers.ModelSerializer):
    district = DistrictsSerializers(read_only=True)

    class Meta:
        model = Agent
        fields = ('id', 'phone', 'password', 'name', 'profile_pic', 'address', 'district', 'asign', 'active','bid','bkash','mar_status','empl_status','gender','nid',)


class CampaignSerializers(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ('id', 'name')


class AddCampaignDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = CampaignDetails
        fields = ('id', 'clId', 'agentId', 'campaignId')


class CampaignDetailsSerializers(serializers.ModelSerializer):
    clId = CLSerializers2(read_only=True, )
    agentId = AgentSerializers2(read_only=True)
    campaignId = CampaignSerializers(read_only=True)

    class Meta:
        model = CampaignDetails
        fields = ('id', 'clId', 'agentId', 'campaignId')


class LocationSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocationChecklist
        fields = ('id', 'campgDetails', 'date', 'location','amount')

class LocationViewSerializers(serializers.ModelSerializer):
    campgDetails = CampaignDetailsSerializers(read_only=True, )
    class Meta:
        model = LocationChecklist
        fields = ('id', 'campgDetails', 'date', 'location','amount')

