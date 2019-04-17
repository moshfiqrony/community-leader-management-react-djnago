from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CLSerializers, AgentSerializers, CampaignSerializers, AddCampaignDetailsSerializers,DistrictsSerializers, CampaignDetailsSerializers, CLSerializers2, LocationSerializers, LocationViewSerializers, UserAdminSerializers
from ..models import CL, Agent, Campaign, CampaignDetails, Districts, LocationChecklist, UserAdmin


class DistrictsViews(viewsets.ModelViewSet):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name',)


class CLViews(viewsets.ModelViewSet):
    queryset = CL.objects.all().order_by('active').reverse()
    serializer_class = CLSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone','district',)


class CLDetailsViews(viewsets.ModelViewSet):
    queryset = CL.objects.all().order_by('active').reverse()
    serializer_class = CLSerializers2
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone','district',)


class AgentViews(viewsets.ModelViewSet):
    queryset = Agent.objects.all().order_by('active', 'asign').reverse()
    serializer_class = AgentSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone', 'district', 'active', 'asign',)


class CampaignViews(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializers


class AddCampaignDetailsViews(viewsets.ModelViewSet):
    queryset = CampaignDetails.objects.all()
    serializer_class = AddCampaignDetailsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('clId', 'campaignId', 'agentId',)

class CampaignDetailsViews(viewsets.ModelViewSet):
    queryset = CampaignDetails.objects.all()
    serializer_class = CampaignDetailsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('clId', 'campaignId','agentId', 'agentId__id', 'campaignId__id')


class LocationInsertViews(viewsets.ModelViewSet):
    queryset = LocationChecklist.objects.all()
    serializer_class = LocationSerializers


class LocationViews(viewsets.ModelViewSet):
    queryset = LocationChecklist.objects.all()
    serializer_class = LocationViewSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('campgDetails__campaignId__id', 'campgDetails__clId__id', 'campgDetails__agentId__district' ,'campgDetails__id', 'date', 'amount', 'campgDetails__agentId__id', )


class UserAdminView(viewsets.ModelViewSet):
    queryset = UserAdmin.objects.all()
    serializer_class = UserAdminSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('username', 'password');