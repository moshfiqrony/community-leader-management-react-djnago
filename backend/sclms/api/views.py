from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_guardian import filters

from .serializers import CLSerializers, AgentSerializers, CampaignSerializers, AddCampaignDetailsSerializers, \
    DistrictsSerializers, CampaignDetailsSerializers, CLSerializers2, LocationSerializers, DataCollectionSerializers, \
    DataCollectionViewSerializers, LocationViewSerializers
from ..models import CL, Agent, Campaign, CampaignDetails, Districts, LocationChecklist, DataCollectionChecklist

class CustomObjectPermissions(permissions.DjangoObjectPermissions):
    """
    Similar to `DjangoObjectPermissions`, but adding 'view' permissions.
    """
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': ['%(app_label)s.view_%(model_name)s'],
        'HEAD': ['%(app_label)s.view_%(model_name)s'],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

class DistrictsViews(viewsets.ModelViewSet):
    queryset = Districts.objects.all()
    serializer_class = DistrictsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name',)


class CLViews(viewsets.ModelViewSet):
    queryset = CL.objects.all().order_by('active').reverse()
    serializer_class = CLSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone',)


class CLDetailsViews(viewsets.ModelViewSet):
    queryset = CL.objects.all().order_by('active').reverse()
    serializer_class = CLSerializers2
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('phone',)


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
    filter_fields = ('clId', 'campaignId', 'agentId')

class CampaignDetailsViews(viewsets.ModelViewSet):
    queryset = CampaignDetails.objects.all()
    serializer_class = CampaignDetailsSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('clId', 'campaignId',)


class LocationInsertViews(viewsets.ModelViewSet):
    queryset = LocationChecklist.objects.all()
    serializer_class = LocationSerializers


class LocationViews(viewsets.ModelViewSet):
    queryset = LocationChecklist.objects.all()
    serializer_class = LocationViewSerializers


class DataCollectionInsertViews(viewsets.ModelViewSet):
    queryset = DataCollectionChecklist.objects.all()
    serializer_class = DataCollectionSerializers


class DataCollectionViews(viewsets.ModelViewSet):
    queryset = DataCollectionChecklist.objects.all()
    serializer_class = DataCollectionViewSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('campgDetails__campaignId__id',)
