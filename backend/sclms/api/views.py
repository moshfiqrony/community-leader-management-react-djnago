from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CLSerializers, AgentSerializers, CampaignSerializers, AddCampaignDetailsSerializers, DistrictsSerializers, CampaignDetailsSerializers, CLSerializers2, LocationSerializers, DataCollectionSerializers
from ..models import CL, Agent, Campaign, CampaignDetails, Districts, LocationChecklist, DataCollectionChecklist


class DistrictsViews(viewsets.ModelViewSet):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name',)

class CLViews(viewsets.ModelViewSet):
    queryset = CL.objects.all().order_by('active')
    serializer_class = CLSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone',)


class CLDetailsViews(viewsets.ModelViewSet):
    queryset = CL.objects.all().order_by('active')
    serializer_class = CLSerializers2
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone',)

class AgentViews(viewsets.ModelViewSet):
    queryset = Agent.objects.all().order_by('active', 'asign').reverse()
    serializer_class = AgentSerializers


class CampaignViews(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializers


class AddCampaignDetailsViews(viewsets.ModelViewSet):
    queryset = CampaignDetails.objects.all()
    serializer_class = AddCampaignDetailsSerializers


class CampaignDetailsViews(viewsets.ModelViewSet):
    queryset = CampaignDetails.objects.all()
    serializer_class = CampaignDetailsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('clId', 'campaignId',)


class LocationViews(viewsets.ModelViewSet):
    queryset = LocationChecklist.objects.all()
    serializer_class = LocationSerializers

class DataCollectionViews(viewsets.ModelViewSet):
    queryset = DataCollectionChecklist.objects.all()
    serializer_class = DataCollectionSerializers